import { useState } from 'react';
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
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            <ApiStatusBanner />
            
            <InputCard
              productInput={productInput}
              setProductInput={setProductInput}
              onGenerate={handleGenerateLifecycle}
              isGenerating={isGeneratingPlan}
              error={planError}
            />
            
            {lifecycleData && (
              <>
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
              </>
            )}
          </div>
        </main>
      </div>
      
      <Toaster position="bottom-right" />
    </div>
  );
}
