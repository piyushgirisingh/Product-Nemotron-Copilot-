import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ApiStatusBanner } from './components/ApiStatusBanner';
import { InputCard } from './components/InputCard';
import { LifecycleOverviewCard } from './components/LifecycleOverviewCard';
import { ExecutionPlanCard } from './components/ExecutionPlanCard';
import { RisksMetricsCard } from './components/RisksMetricsCard';
import { StatusSummaryCard } from './components/StatusSummaryCard';
import { TeamMemberPicker } from './components/TeamMemberPicker';
import { AuthPage } from './components/AuthPage';
import { Toaster } from './components/ui/sonner';
import { api } from './lib/api-client';
import { ExpandableSection } from './components/ExpandableSection';
import { TeamMember } from './types/collaboration';
import { useAuth } from './contexts/AuthContext';
import { logOut } from './services/authService';
import {
  createProject,
  getUserProjects,
  updateProject,
} from './services/databaseService';
import { toast } from 'sonner';

export interface ProductInput {
  name: string;
  description: string;
  targetUsers: string;
  timeline: string;
}

export interface Task {
  id: string;
  phase: string;
  task: string;
  priority: 'P0' | 'P1' | 'P2';
  status: 'Not started' | 'In progress' | 'Done';
}

export interface Phase {
  name: string;
  description: string;
  status: 'active' | 'upcoming' | 'completed';
}

export interface LifecycleData {
  phases: Phase[];
  tasks: Task[];
  risks: string[];
  kpis: string[];
}

export interface ReportData {
  statusSummary: string;
  nextSteps: string[];
  launchChecklist: Array<{
    item: string;
    status: 'complete' | 'in-progress' | 'pending';
  }>;
}

export default function App() {
  const { user, loading: authLoading } = useAuth();
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [productInput, setProductInput] = useState<ProductInput>({
    name: '',
    description: '',
    targetUsers: '',
    timeline: '6 months',
  });

  const [lifecycleData, setLifecycleData] = useState<LifecycleData | null>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [isGeneratingStatus, setIsGeneratingStatus] = useState(false);
  const [isSendingSlack, setIsSendingSlack] = useState(false);
  
  const [planError, setPlanError] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);

  // Collaboration state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [taskAssignments, setTaskAssignments] = useState<Record<string, string[]>>({});

  // Load existing project or create new one
  useEffect(() => {
    if (!user) {
      setCurrentProjectId(null);
      setLifecycleData(null);
      setTeamMembers([]);
      setTaskAssignments({});
      setReportData(null);
      return;
    }

    // Load user's latest project
    const loadProject = async () => {
      try {
        const projects = await getUserProjects(user.uid);
        if (projects.length > 0) {
          const latestProject = projects[0];
          setCurrentProjectId(latestProject.id);
          setProductInput({
            name: latestProject.name,
            description: latestProject.description,
            targetUsers: latestProject.targetUsers,
            timeline: latestProject.timeline,
          });
          setLifecycleData({
            phases: latestProject.phases,
            tasks: latestProject.tasks,
            risks: latestProject.risks,
            kpis: latestProject.kpis,
          });
          setTeamMembers(latestProject.teamMembers || []);
          setTaskAssignments(latestProject.taskAssignments || {});
          setReportData(latestProject.reportData);
          toast.success('Project loaded successfully!');
        } else {
          // New user - no projects yet, that's okay
          console.log('No existing projects. Ready to create new project.');
        }
      } catch (error: any) {
        console.error('Error loading project:', error);
        // Only show error if it's not a permission issue for new users
        if (!error.message?.includes('permission-denied')) {
          toast.error('Error loading data. Please try refreshing.');
        }
      }
    };

    loadProject();
  }, [user]);

  // Auto-save project changes
  const saveProject = async () => {
    if (!user || !lifecycleData) return;

    try {
      if (currentProjectId) {
        // Update existing project
        await updateProject(currentProjectId, {
          name: productInput.name || 'Untitled Project',
          description: productInput.description || '',
          targetUsers: productInput.targetUsers || '',
          timeline: productInput.timeline || '6 months',
          phases: lifecycleData.phases,
          tasks: lifecycleData.tasks,
          risks: lifecycleData.risks,
          kpis: lifecycleData.kpis,
          teamMembers,
          taskAssignments,
          reportData,
        });
        console.log('Project updated successfully');
      } else {
        // Create new project
        const projectId = await createProject(user.uid, {
          name: productInput.name || 'Untitled Project',
          description: productInput.description || '',
          targetUsers: productInput.targetUsers || '',
          timeline: productInput.timeline || '6 months',
          phases: lifecycleData.phases,
          tasks: lifecycleData.tasks,
          risks: lifecycleData.risks,
          kpis: lifecycleData.kpis,
          teamMembers,
          taskAssignments,
          reportData,
        });
        setCurrentProjectId(projectId);
        toast.success('Project saved successfully!');
        console.log('New project created:', projectId);
      }
    } catch (error: any) {
      console.error('Error saving project:', error);
      toast.error('Failed to save: ' + (error.message || 'Unknown error'));
    }
  };

  // Auto-save when data changes
  useEffect(() => {
    if (lifecycleData && user) {
      const timeoutId = setTimeout(() => {
        saveProject();
      }, 2000); // Debounce save by 2 seconds

      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lifecycleData, teamMembers, taskAssignments, reportData, user]);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  // Team member management
  const handleAddMember = (member: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = {
      ...member,
      id: `member-${Date.now()}`,
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const handleRemoveMember = (memberId: string) => {
    setTeamMembers(teamMembers.filter(m => m.id !== memberId));
    
    // Remove all assignments for this member
    const updatedAssignments = { ...taskAssignments };
    Object.keys(updatedAssignments).forEach(taskId => {
      updatedAssignments[taskId] = updatedAssignments[taskId].filter(id => id !== memberId);
    });
    setTaskAssignments(updatedAssignments);
  };

  // Task assignment management
  const handleAssignTask = (taskId: string, memberId: string) => {
    const currentAssignments = taskAssignments[taskId] || [];
    if (!currentAssignments.includes(memberId)) {
      setTaskAssignments({
        ...taskAssignments,
        [taskId]: [...currentAssignments, memberId],
      });
    }
  };

  const handleUnassignTask = (taskId: string, memberId: string) => {
    const currentAssignments = taskAssignments[taskId] || [];
    setTaskAssignments({
      ...taskAssignments,
      [taskId]: currentAssignments.filter(id => id !== memberId),
    });
  };

  const handleGenerateLifecycle = async () => {
    // Validation
    if (!productInput.name.trim()) {
      setPlanError('Product name is required');
      return;
    }
    if (!productInput.description.trim()) {
      setPlanError('Description is required');
      return;
    }

    setPlanError(null);
    setIsGeneratingPlan(true);

    try {
      const data = await api.generateLifecycle(productInput);
      setLifecycleData(data);
      setReportData(null); // Reset report when new lifecycle is generated
    } catch (error) {
      setPlanError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const handleGenerateStatus = async () => {
    if (!lifecycleData) return;

    setStatusError(null);
    setIsGeneratingStatus(true);

    try {
      const data = await api.generateStatus(lifecycleData, productInput);
      setReportData(data);
    } catch (error) {
      setStatusError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsGeneratingStatus(false);
    }
  };

  const handleSendToSlack = async () => {
    if (!reportData || !lifecycleData) return;

    setIsSendingSlack(true);

    const doneTasks = lifecycleData.tasks.filter(t => t.status === 'Done').length;
    const totalTasks = lifecycleData.tasks.length;
    const progress = Math.round((doneTasks / totalTasks) * 100);

    try {
      await api.sendToSlack({
        productName: productInput.name,
        statusSummary: reportData.statusSummary,
        progress,
        doneTasks,
        totalTasks,
        nextSteps: reportData.nextSteps,
        launchChecklist: reportData.launchChecklist,
      });

      return true;
    } catch (error) {
      throw error;
    } finally {
      setIsSendingSlack(false);
    }
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    if (!lifecycleData) return;

    setLifecycleData(prevData => {
      if (!prevData) return prevData;
      
      const updatedTasks = prevData.tasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );

      return {
        ...prevData,
        tasks: updatedTasks,
      };
    });
  };

  const calculateProgress = () => {
    if (!lifecycleData) return { doneTasks: 0, totalTasks: 0, percent: 0 };
    
    const doneTasks = lifecycleData.tasks.filter(t => t.status === 'Done').length;
    const totalTasks = lifecycleData.tasks.length;
    const percent = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
    
    return { doneTasks, totalTasks, percent };
  };

  const progress = calculateProgress();

  // Show loading while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[var(--lc-bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg animate-pulse">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-[var(--lc-muted)]">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth page if not logged in
  if (!user) {
    return (
      <>
        <AuthPage onAuthSuccess={() => {}} />
        <Toaster position="bottom-right" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--lc-bg)] text-[var(--lc-text)] flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <Navbar onLogin={() => {}} onLogout={handleLogout} isLoggedIn={!!user} />
      
      <main className="px-8 py-6 pt-24 overflow-y-auto" style={{ paddingTop: '96px' }}>
          <div className="max-w-6xl mx-auto space-y-6">
              <ApiStatusBanner />
              
              <div className="animate-slide-up">
                <InputCard
                  productInput={productInput}
                  setProductInput={setProductInput}
                  onGenerate={handleGenerateLifecycle}
                  isGenerating={isGeneratingPlan}
                  error={planError}
                />
              </div>
              
              {lifecycleData && (
                <div className="space-y-6 animate-fade-in">
                  <LifecycleOverviewCard
                    phases={lifecycleData.phases}
                    tasks={lifecycleData.tasks}
                    progress={progress}
                  />
                  
                  <ExpandableSection title="Team & Stakeholders" defaultOpen={true}>
                    <TeamMemberPicker
                      teamMembers={teamMembers}
                      onAddMember={handleAddMember}
                      onRemoveMember={handleRemoveMember}
                    />
                  </ExpandableSection>

                  <ExpandableSection title="Execution Plan" defaultOpen={true}>
                    <ExecutionPlanCard
                      tasks={lifecycleData.tasks}
                      teamMembers={teamMembers}
                      taskAssignments={taskAssignments}
                      onUpdateTaskStatus={handleUpdateTaskStatus}
                      onAssignTask={handleAssignTask}
                      onUnassignTask={handleUnassignTask}
                    />
                  </ExpandableSection>
                  
                  <RisksMetricsCard
                    risks={lifecycleData.risks}
                    kpis={lifecycleData.kpis}
                  />
                  
                  <StatusSummaryCard
                    reportData={reportData}
                    onGenerateStatus={handleGenerateStatus}
                    onSendToSlack={handleSendToSlack}
                    isGeneratingStatus={isGeneratingStatus}
                    isSendingSlack={isSendingSlack}
                    statusError={statusError}
                    hasLifecycleData={!!lifecycleData}
                  />
                </div>
              )}
            </div>
        </main>
      
      <Toaster position="bottom-right" />
    </div>
  );
}
