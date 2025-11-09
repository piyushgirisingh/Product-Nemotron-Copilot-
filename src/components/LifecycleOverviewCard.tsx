import { Card } from './ui/card';
import { Phase, Task } from '../App';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

interface LifecycleOverviewCardProps {
  phases: Phase[];
  tasks: Task[];
  progress: {
    doneTasks: number;
    totalTasks: number;
    percent: number;
  };
}

export function LifecycleOverviewCard({ phases, tasks, progress }: LifecycleOverviewCardProps) {
  // Calculate phase completion and determine current phase
  const getPhaseStats = (phaseName: string) => {
    const phaseTasks = tasks.filter(t => t.phase === phaseName);
    const completedTasks = phaseTasks.filter(t => t.status === 'Done').length;
    const inProgressTasks = phaseTasks.filter(t => t.status === 'In progress').length;
    const totalTasks = phaseTasks.length;
    const completionPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    return {
      completed: completedTasks,
      total: totalTasks,
      percent: completionPercent,
      hasInProgress: inProgressTasks > 0,
      isFullyComplete: completedTasks === totalTasks && totalTasks > 0,
      isEmpty: totalTasks === 0
    };
  };

  // Determine which phase is currently active
  const getCurrentPhase = () => {
    for (let i = 0; i < phases.length; i++) {
      const stats = getPhaseStats(phases[i].name);
      // Current phase is one that has tasks but isn't fully complete
      if (!stats.isEmpty && !stats.isFullyComplete) {
        return phases[i].name;
      }
    }
    // If all phases with tasks are complete, return the last phase
    const lastPhaseWithTasks = [...phases].reverse().find(p => getPhaseStats(p.name).total > 0);
    return lastPhaseWithTasks?.name || phases[0].name;
  };

  const currentPhase = getCurrentPhase();

  const getPhaseStatus = (phaseName: string) => {
    const stats = getPhaseStats(phaseName);
    const isCurrentPhase = phaseName === currentPhase;
    
    if (stats.isFullyComplete) return 'completed';
    if (isCurrentPhase) return 'active';
    return 'upcoming';
  };

  const getStatusColor = (phaseName: string) => {
    const status = getPhaseStatus(phaseName);
    if (status === 'completed') return 'border-green-500 bg-green-500/10';
    if (status === 'active') return 'border-blue-500 bg-blue-500/10';
    return 'border-[var(--lc-border)] bg-[var(--lc-surface-soft)]/30';
  };

  const getStatusIcon = (phaseName: string) => {
    const status = getPhaseStatus(phaseName);
    const stats = getPhaseStats(phaseName);
    
    if (status === 'completed') {
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    }
    if (status === 'active' && stats.hasInProgress) {
      return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
    }
    if (status === 'active') {
      return <Circle className="w-5 h-5 text-blue-500 fill-blue-500" />;
    }
    return <Circle className="w-5 h-5 text-[var(--lc-muted)]" />;
  };

  return (
    <Card className="space-y-6 bg-[var(--lc-surface)] border-[var(--lc-border)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-sm">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-[var(--lc-text)] font-semibold text-xl">Lifecycle Overview</h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--lc-muted)]">
          <Circle className="w-3 h-3 text-blue-500 fill-blue-500" />
          <span>Current Phase: <span className="font-semibold text-blue-400">{currentPhase}</span></span>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Phase Boxes Grid */}
        <div className="grid grid-cols-3 gap-4">
          {phases.map((phase) => {
            const stats = getPhaseStats(phase.name);
            const isActive = getPhaseStatus(phase.name) === 'active';
            
            return (
              <div
                key={phase.name}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${getStatusColor(phase.name)} ${
                  isActive ? 'shadow-lg scale-105' : 'hover:scale-102'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-[var(--lc-text)] mb-1">{phase.name}</h3>
                    <p className="text-xs text-[var(--lc-muted)] line-clamp-2">{phase.description}</p>
                  </div>
                  {getStatusIcon(phase.name)}
                </div>
                
                {/* Phase Progress */}
                {stats.total > 0 && (
                  <div className="mt-3 pt-3 border-t border-[var(--lc-border)]">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[var(--lc-muted)]">Progress</span>
                      <span className="font-semibold text-[var(--lc-text)]">{stats.percent}%</span>
                    </div>
                    <div className="h-1.5 bg-[var(--lc-surface-soft)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                        style={{ width: `${stats.percent}%` }}
                      />
                    </div>
                    <div className="text-xs text-[var(--lc-muted)] mt-1">
                      {stats.completed} / {stats.total} tasks
                    </div>
                  </div>
                )}
                
                {stats.isEmpty && (
                  <div className="text-xs text-[var(--lc-muted)] italic mt-2">
                    No tasks yet
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Overall Progress Bar */}
        <div className="pt-4 border-t border-[var(--lc-border)]">
          <div className="flex items-center gap-4">
            <span className="text-sm text-[var(--lc-muted)] font-medium whitespace-nowrap">
              Overall progress
            </span>
            <div className="flex-1 relative rounded-full overflow-hidden h-3 bg-[var(--lc-surface-soft)]">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-blue-500 to-green-500"
                style={{ width: `${progress.percent}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
              {progress.percent === 100 && (
                <div className="absolute -right-1 -top-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <span className="text-sm font-semibold text-[var(--lc-text)] whitespace-nowrap">
              {progress.percent}% · {progress.doneTasks} / {progress.totalTasks} tasks
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default LifecycleOverviewCard;
