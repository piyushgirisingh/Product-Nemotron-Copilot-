import { Card } from './ui/card';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Task } from '../App';

interface ExecutionPlanCardProps {
  tasks: Task[];
  onUpdateTaskStatus: (taskId: string, status: Task['status']) => void;
}

export function ExecutionPlanCard({ tasks, onUpdateTaskStatus }: ExecutionPlanCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P0':
        return 'bg-red-900/30 text-red-300 border-red-700 font-medium';
      case 'P1':
        return 'bg-orange-900/30 text-orange-300 border-orange-700 font-medium';
      case 'P2':
        return 'bg-yellow-900/30 text-yellow-300 border-yellow-700 font-medium';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'Done':
        return 'text-green-400';
      case 'In progress':
        return 'text-blue-400';
      default:
        return 'text-slate-400';
    }
  };

  // Get unique phases in order
  const phases = Array.from(new Set(tasks.map(t => t.phase)));
  
  return (
    <Card className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h2 className="text-[var(--lc-text)] font-semibold">Execution Plan</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[var(--lc-muted)] hover:text-red-400 transition-colors duration-150">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span>Critical</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-orange-400 transition-colors">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <span>Important</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-yellow-400 transition-colors">
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <span>Nice to have</span>
            </div>
          </div>
        </div>
      
      <div className="border border-[var(--lc-border)] rounded-lg overflow-hidden bg-[var(--lc-surface-soft)]/50">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--lc-surface-soft)] border-b border-[var(--lc-border)]">
              <TableHead className="w-32 text-xs font-semibold text-[var(--lc-muted)]">Phase</TableHead>
              <TableHead className="text-xs font-semibold text-[var(--lc-muted)]">Task</TableHead>
              <TableHead className="w-24 text-xs font-semibold text-[var(--lc-muted)]">Priority</TableHead>
              <TableHead className="w-40 text-xs font-semibold text-[var(--lc-muted)]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {phases.map((phase) => {
              const phaseTasks = tasks.filter(t => t.phase === phase);
              return phaseTasks.map((task, index) => (
                <TableRow 
                  key={task.id} 
                  className="border-b border-[var(--lc-border)] last:border-0 hover:bg-[var(--lc-surface)]/60 transition-colors duration-150 group/row"
                >
                  <TableCell className="text-xs text-[var(--lc-muted)] font-semibold">
                    {index === 0 && (
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                        {phase}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-[var(--lc-text)] group-hover/row:text-[var(--lc-text)] transition-colors duration-150">
                    {task.task}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`${getPriorityColor(task.priority)} text-xs px-2.5 py-1 transition-all duration-200 hover:scale-105`}
                    >
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={task.status}
                      onValueChange={(value) => onUpdateTaskStatus(task.id, value as Task['status'])}
                    >
                      <SelectTrigger className={`h-8 text-xs border-[var(--lc-border)] bg-[var(--lc-surface-soft)] hover:border-[var(--lc-accent)] transition-colors duration-150 ${getStatusColor(task.status)}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Not started" className="text-xs">📝 Not started</SelectItem>
                        <SelectItem value="In progress" className="text-xs">⚡ In progress</SelectItem>
                        <SelectItem value="Done" className="text-xs">✅ Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ));
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

export default ExecutionPlanCard;
