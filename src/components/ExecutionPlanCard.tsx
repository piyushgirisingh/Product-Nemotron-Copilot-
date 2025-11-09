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
    <Card className="p-6 bg-white border border-neutral-200 shadow-sm rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-neutral-900">3. Tasks by phase</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span>Critical</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <span>Important</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span>Nice to have</span>
          </div>
        </div>
      </div>
      
      <div className="border border-neutral-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50 hover:bg-neutral-50 border-b border-neutral-200">
              <TableHead className="w-32 text-xs font-medium text-neutral-600">Phase</TableHead>
              <TableHead className="text-xs font-medium text-neutral-600">Task</TableHead>
              <TableHead className="w-24 text-xs font-medium text-neutral-600">Priority</TableHead>
              <TableHead className="w-40 text-xs font-medium text-neutral-600">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {phases.map((phase) => {
              const phaseTasks = tasks.filter(t => t.phase === phase);
              return phaseTasks.map((task, index) => (
                <TableRow 
                  key={task.id} 
                  className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors"
                >
                  <TableCell className="text-xs text-neutral-500 font-medium">
                    {index === 0 ? phase : ''}
                  </TableCell>
                  <TableCell className="text-sm text-neutral-900">{task.task}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`${getPriorityColor(task.priority)} text-xs px-2 py-0.5`}
                    >
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={task.status}
                      onValueChange={(value) => onUpdateTaskStatus(task.id, value as Task['status'])}
                    >
                      <SelectTrigger className={`h-8 text-xs border-neutral-200 ${getStatusColor(task.status)}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Not started" className="text-xs">Not started</SelectItem>
                        <SelectItem value="In progress" className="text-xs">In progress</SelectItem>
                        <SelectItem value="Done" className="text-xs">Done</SelectItem>
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
