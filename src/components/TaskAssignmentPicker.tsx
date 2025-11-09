import { Check } from 'lucide-react';
import { TeamMember } from '../types/collaboration';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { Button } from './ui/button';

interface TaskAssignmentPickerProps {
  teamMembers: TeamMember[];
  assignedMemberIds: string[];
  onAssign: (memberId: string) => void;
  onUnassign: (memberId: string) => void;
}

export function TaskAssignmentPicker({
  teamMembers,
  assignedMemberIds,
  onAssign,
  onUnassign,
}: TaskAssignmentPickerProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const assignedMembers = teamMembers.filter(m => assignedMemberIds.includes(m.id));

  const getColorStyle = (color: string) => {
    const colorMap: Record<string, string> = {
      'blue-500': 'bg-blue-500',
      'purple-500': 'bg-purple-500',
      'green-500': 'bg-green-500',
      'orange-500': 'bg-orange-500',
      'pink-500': 'bg-pink-500',
      'indigo-500': 'bg-indigo-500',
      'red-500': 'bg-red-500',
      'teal-500': 'bg-teal-500',
      'yellow-500': 'bg-yellow-500',
      'cyan-500': 'bg-cyan-500',
      'fuchsia-500': 'bg-fuchsia-500',
      'emerald-500': 'bg-emerald-500',
    };
    return colorMap[color] || 'bg-blue-500';
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {assignedMembers.length === 0 ? (
          <button 
            className="w-8 h-8 rounded-full border-2 border-dashed border-blue-400 flex items-center justify-center hover:border-blue-500 hover:bg-blue-500/10 transition-all cursor-pointer"
          >
            <span className="text-base text-blue-400 font-bold">+</span>
          </button>
        ) : (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 gap-1 hover:bg-blue-600/20 transition-all"
          >
            <div className="flex -space-x-2">
              {assignedMembers.slice(0, 3).map((member) => (
                <div
                  key={member.id}
                  className={`w-6 h-6 rounded-full ${getColorStyle(member.color)} flex items-center justify-center text-white text-xs font-semibold ring-2 ring-[var(--lc-surface)]`}
                  title={member.name}
                >
                  {getInitials(member.name)}
                </div>
              ))}
              {assignedMembers.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-neutral-500 flex items-center justify-center text-white text-xs font-semibold ring-2 ring-[var(--lc-surface)]">
                  +{assignedMembers.length - 3}
                </div>
              )}
            </div>
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent 
        className="w-64 p-2 border-2 border-slate-700 shadow-2xl rounded-lg"
        style={{ 
          backgroundColor: '#0f172a',
          zIndex: 9999
        }}
      >
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-400 px-2 py-1">Assign to</p>
          {teamMembers.length === 0 ? (
            <div className="px-2 py-4 text-center text-sm text-slate-400">
              No team members yet
            </div>
          ) : (
            teamMembers.map((member) => {
              const isAssigned = assignedMemberIds.includes(member.id);
              return (
                <button
                  key={member.id}
                  onClick={() => isAssigned ? onUnassign(member.id) : onAssign(member.id)}
                  className="w-full flex items-center gap-2 px-2 py-2 rounded hover:bg-slate-800 transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-full ${getColorStyle(member.color)} flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}
                  >
                    {getInitials(member.name)}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-white">{member.name}</p>
                    <p className="text-xs text-slate-400">{member.role}</p>
                  </div>
                  {isAssigned && (
                    <Check className="w-4 h-4 text-green-500" />
                  )}
                </button>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

