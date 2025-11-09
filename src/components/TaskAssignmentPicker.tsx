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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1">
          {assignedMembers.length === 0 ? (
            <div className="w-6 h-6 rounded-full border-2 border-dashed border-neutral-300 flex items-center justify-center">
              <span className="text-xs text-neutral-400">+</span>
            </div>
          ) : (
            <div className="flex -space-x-2">
              {assignedMembers.slice(0, 3).map((member) => (
                <div
                  key={member.id}
                  className={`w-6 h-6 rounded-full bg-${member.color} flex items-center justify-center text-white text-xs font-semibold ring-2 ring-white`}
                  title={member.name}
                >
                  {getInitials(member.name)}
                </div>
              ))}
              {assignedMembers.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-neutral-400 flex items-center justify-center text-white text-xs font-semibold ring-2 ring-white">
                  +{assignedMembers.length - 3}
                </div>
              )}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-neutral-500 px-2 py-1">Assign to</p>
          {teamMembers.length === 0 ? (
            <div className="px-2 py-4 text-center text-sm text-neutral-500">
              No team members yet
            </div>
          ) : (
            teamMembers.map((member) => {
              const isAssigned = assignedMemberIds.includes(member.id);
              return (
                <button
                  key={member.id}
                  onClick={() => isAssigned ? onUnassign(member.id) : onAssign(member.id)}
                  className="w-full flex items-center gap-2 px-2 py-2 rounded hover:bg-neutral-100 transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-full bg-${member.color} flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}
                  >
                    {getInitials(member.name)}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-neutral-900">{member.name}</p>
                    <p className="text-xs text-neutral-500">{member.role}</p>
                  </div>
                  {isAssigned && (
                    <Check className="w-4 h-4 text-green-600" />
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

