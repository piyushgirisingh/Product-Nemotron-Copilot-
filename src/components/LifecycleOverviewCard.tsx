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
    <Card className="p-6 bg-white border border-neutral-200 shadow-sm rounded-xl">
      <h2 className="text-neutral-900 mb-6">2. Lifecycle overview</h2>
      
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
        
        <div className="space-y-3 pt-4 border-t border-neutral-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-700">
              Overall progress
            </span>
            <span className="text-sm font-medium text-neutral-900">
              {progress.percent}% · {progress.doneTasks} / {progress.totalTasks} tasks completed
            </span>
          </div>
          <div className="relative">
            <Progress value={progress.percent} className="h-2 bg-neutral-100" />
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
