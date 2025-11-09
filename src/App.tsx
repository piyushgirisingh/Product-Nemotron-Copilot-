import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ApiStatusBanner } from './components/ApiStatusBanner';
import { InputCard } from './components/InputCard';
import { LifecycleOverviewCard } from './components/LifecycleOverviewCard';
import { ExecutionPlanCard } from './components/ExecutionPlanCard';
import { RisksMetricsCard } from './components/RisksMetricsCard';
import { StatusSummaryCard } from './components/StatusSummaryCard';
import { Toaster } from './components/ui/sonner';
import { api } from './lib/api-client';

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
  const [productInput, setProductInput] = useState<ProductInput>({
    name: '',
    description: '',
    targetUsers: '',
    timeline: '6',
  });

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

    const updatedTasks = lifecycleData.tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    setLifecycleData({
      ...lifecycleData,
      tasks: updatedTasks,
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50/30 to-indigo-50/20 flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <Navbar />
      
      <div className="flex flex-1 relative z-10">
        <Sidebar />
        
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            <ApiStatusBanner />
            
            {/* Welcome Section */}
            {!lifecycleData && (
              <div className="text-center py-8 animate-fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/50 mb-4 animate-float">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-neutral-900 mb-2 tracking-tight">
                  Welcome to Lifecycle Copilot
                </h1>
                <p className="text-neutral-600 max-w-2xl mx-auto">
                  AI-powered product lifecycle planning that transforms your ideas into actionable roadmaps.
                  Get started by describing your product below.
                </p>
              </div>
            )}
            
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
      </div>
      
      <Toaster position="bottom-right" />
    </div>
  );
}
