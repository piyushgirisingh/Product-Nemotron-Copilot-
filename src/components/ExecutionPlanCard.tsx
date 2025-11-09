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
        return 'bg-red-50 text-red-700 border-red-200 font-medium';
      case 'P1':
        return 'bg-orange-50 text-orange-700 border-orange-200 font-medium';
      case 'P2':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200 font-medium';
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'Done':
        return 'text-green-700';
      case 'In progress':
        return 'text-blue-700';
      default:
        return 'text-neutral-500';
    }
  };

  // Get unique phases in order
  const phases = Array.from(new Set(tasks.map(t => t.phase)));
  
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border border-neutral-200/60 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl group relative overflow-hidden">
      {/* Gradient accent on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h2 className="text-neutral-900 font-semibold">Execution Plan</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-red-600 transition-colors">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span>Critical</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-orange-600 transition-colors">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <span>Important</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-yellow-600 transition-colors">
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <span>Nice to have</span>
            </div>
          </div>
        </div>
      
      <div className="border border-neutral-200/60 rounded-lg overflow-hidden bg-white/50">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-neutral-50 to-neutral-100/50 hover:from-neutral-100 hover:to-neutral-50 border-b border-neutral-200 transition-all">
              <TableHead className="w-32 text-xs font-semibold text-neutral-700">Phase</TableHead>
              <TableHead className="text-xs font-semibold text-neutral-700">Task</TableHead>
              <TableHead className="w-24 text-xs font-semibold text-neutral-700">Priority</TableHead>
              <TableHead className="w-40 text-xs font-semibold text-neutral-700">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {phases.map((phase) => {
              const phaseTasks = tasks.filter(t => t.phase === phase);
              return phaseTasks.map((task, index) => (
                <TableRow 
                  key={task.id} 
                  className="border-b border-neutral-100 last:border-0 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 transition-all duration-200 group/row"
                >
                  <TableCell className="text-xs text-neutral-500 font-semibold">
                    {index === 0 && (
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                        {phase}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-neutral-900 group-hover/row:text-neutral-950 transition-colors">
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
                      <SelectTrigger className={`h-8 text-xs border-neutral-200 hover:border-neutral-300 transition-all ${getStatusColor(task.status)}`}>
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
      </div>
    </Card>
  );
}
