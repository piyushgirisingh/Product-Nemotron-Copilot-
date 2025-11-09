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
import { TeamMember } from '../types/collaboration';
import { TaskAssignmentPicker } from './TaskAssignmentPicker';

interface ExecutionPlanCardProps {
  tasks: Task[];
  teamMembers?: TeamMember[];
  taskAssignments?: Record<string, string[]>; // taskId -> array of memberIds
  onUpdateTaskStatus: (taskId: string, status: Task['status']) => void;
  onAssignTask?: (taskId: string, memberId: string) => void;
  onUnassignTask?: (taskId: string, memberId: string) => void;
}

export function ExecutionPlanCard({ 
  tasks, 
  teamMembers = [], 
  taskAssignments = {}, 
  onUpdateTaskStatus,
  onAssignTask,
  onUnassignTask 
}: ExecutionPlanCardProps) {
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
    <Card className="space-y-6 border-2 border-blue-400" style={{ borderColor: '#60a5fa' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-sm">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h2 className="text-[var(--lc-text)] font-semibold text-xl">Execution Plan</h2>
        </div>
      
      <div className="border border-[var(--lc-border)] rounded-lg overflow-hidden bg-[var(--lc-surface-soft)]/50">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--lc-surface-soft)] border-b border-[var(--lc-border)]">
              <TableHead className="w-32 text-xs font-semibold text-[var(--lc-muted)]">Phase</TableHead>
              <TableHead className="text-xs font-semibold text-[var(--lc-muted)]">Task</TableHead>
              <TableHead className="w-24 text-xs font-semibold text-[var(--lc-muted)]">Priority</TableHead>
              <TableHead className="w-32 text-xs font-semibold text-[var(--lc-muted)]">Assigned To</TableHead>
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
                  <TableCell className="text-sm text-[var(--lc-muted)] font-semibold">
                    {index === 0 ? phase : ''}
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
                    {teamMembers.length > 0 && onAssignTask && onUnassignTask ? (
                      <TaskAssignmentPicker
                        teamMembers={teamMembers}
                        assignedMemberIds={taskAssignments[task.id] || []}
                        onAssign={(memberId) => onAssignTask(task.id, memberId)}
                        onUnassign={(memberId) => onUnassignTask(task.id, memberId)}
                      />
                    ) : (
                      <span className="text-xs text-[var(--lc-muted)]">—</span>
                    )}
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
