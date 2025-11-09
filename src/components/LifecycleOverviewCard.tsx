import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { PhaseStep } from './PhaseStep';
import { Phase } from '../App';

interface LifecycleOverviewCardProps {
  phases: Phase[];
  progress: {
    doneTasks: number;
    totalTasks: number;
    percent: number;
  };
}

export function LifecycleOverviewCard({ phases, progress }: LifecycleOverviewCardProps) {
  return (
    <Card className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-sm">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-[var(--lc-text)] font-semibold">Lifecycle Overview</h2>
        </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          {phases.map((phase, index) => (
            <PhaseStep
              key={phase.name}
              name={phase.name}
              description={phase.description}
              status={phase.status}
              isLast={index === phases.length - 1}
            />
          ))}
        </div>
        
        <div className="space-y-3 pt-4 border-t border-[var(--lc-border)]">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--lc-muted)] font-medium">
              Overall progress
            </span>
            <span className="text-sm font-semibold text-[var(--lc-text)]">
              {progress.percent}% · {progress.doneTasks} / {progress.totalTasks} tasks completed
            </span>
          </div>
          <div className="relative group/progress">
            <Progress value={progress.percent} className="h-2.5 bg-[var(--lc-surface-soft)]" />
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--lc-accent)] transition-all duration-700 ease-out shadow-lg relative"
                style={{ width: `${progress.percent}%` }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
            {progress.percent === 100 && (
              <div className="absolute -right-1 -top-1 w-4 h-4 bg-green-500 rounded-full animate-bounce shadow-lg">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default LifecycleOverviewCard;
