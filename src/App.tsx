import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ApiStatusBanner } from './components/ApiStatusBanner';
import { InputCard } from './components/InputCard';
import { LifecycleOverviewCard } from './components/LifecycleOverviewCard';
import { ExecutionPlanCard } from './components/ExecutionPlanCard';
import { RisksMetricsCard } from './components/RisksMetricsCard';
import { StatusSummaryCard } from './components/StatusSummaryCard';
import { Toaster } from './components/ui/sonner';
import { api } from './lib/api-client';
import { ExpandableSection } from './components/ExpandableSection';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [productInput, setProductInput] = useState<ProductInput>({
    name: '',
    description: '',
    targetUsers: '',
    timeline: '6 months',
  });

  const handleLogin = (email: string, password: string) => {
    // Simple login - just set logged in state
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const [lifecycleData, setLifecycleData] = useState<LifecycleData | null>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [isGeneratingStatus, setIsGeneratingStatus] = useState(false);
  const [isSendingSlack, setIsSendingSlack] = useState(false);
  
  const [planError, setPlanError] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-[var(--lc-bg)] text-[var(--lc-text)] flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <Navbar onLogin={handleLogin} onLogout={handleLogout} isLoggedIn={isLoggedIn} />
      
      {isLoggedIn && (
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
                    progress={progress}
                  />
                  
                  <ExecutionPlanCard
                    tasks={lifecycleData.tasks}
                    onUpdateTaskStatus={handleUpdateTaskStatus}
                  />
                  
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
      )}
      
      <Toaster position="bottom-right" />
    </div>
  );
}
