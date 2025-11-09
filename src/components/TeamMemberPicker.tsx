import { useState } from 'react';
import { Users, Plus, X, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { TeamMember, ROLE_COLORS } from '../types/collaboration';

interface TeamMemberPickerProps {
  teamMembers: TeamMember[];
  onAddMember: (member: Omit<TeamMember, 'id'>) => void;
  onRemoveMember: (memberId: string) => void;
}

export function TeamMemberPicker({
  teamMembers,
  onAddMember,
  onRemoveMember,
}: TeamMemberPickerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'Product Manager' as TeamMember['role'],
    department: 'Product' as TeamMember['department'],
  });

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      const colors = ['blue-500', 'purple-500', 'green-500', 'orange-500', 'pink-500', 'indigo-500'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      onAddMember({
        ...newMember,
        color,
      });
      
      setNewMember({
        name: '',
        email: '',
        role: 'Product Manager',
        department: 'Product',
      });
      setShowAddForm(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="p-6 bg-[var(--lc-surface)] border-[var(--lc-border)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold text-[var(--lc-text)]">Team & Stakeholders</h3>
        </div>
        <Button
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          variant={showAddForm ? 'outline' : 'default'}
        >
          {showAddForm ? (
            <>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </>
          )}
        </Button>
      </div>

      {showAddForm && (
        <div className="mb-4 p-4 bg-[var(--lc-surface)] rounded-lg border border-[var(--lc-border)] space-y-3">
          <Input
            placeholder="Full name"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            className="bg-[var(--lc-surface-soft)] border-[var(--lc-border)] text-[var(--lc-text)] placeholder:text-[var(--lc-muted)]"
          />
          <Input
            type="email"
            placeholder="Email address"
            value={newMember.email}
            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
            className="bg-[var(--lc-surface-soft)] border-[var(--lc-border)] text-[var(--lc-text)] placeholder:text-[var(--lc-muted)]"
          />
          <div className="grid grid-cols-2 gap-3">
            <Select
              value={newMember.role}
              onValueChange={(value) => setNewMember({ ...newMember, role: value as TeamMember['role'] })}
            >
              <SelectTrigger className="bg-[var(--lc-surface-soft)] border-[var(--lc-border)] text-[var(--lc-text)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[var(--lc-surface)] border-[var(--lc-border)]">
                <SelectItem value="Product Manager">Product Manager</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Executive">Executive</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={newMember.department}
              onValueChange={(value) => setNewMember({ ...newMember, department: value as TeamMember['department'] })}
            >
              <SelectTrigger className="bg-[var(--lc-surface-soft)] border-[var(--lc-border)] text-[var(--lc-text)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[var(--lc-surface)] border-[var(--lc-border)]">
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAddMember} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Team Member
          </Button>
        </div>
      )}

      <div className="space-y-2">
        {teamMembers.length === 0 ? (
          <div className="text-center py-8 text-[var(--lc-muted)]">
            <Users className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No team members yet</p>
            <p className="text-xs">Add stakeholders to collaborate</p>
          </div>
        ) : (
          teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--lc-surface-soft)] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-medium text-[var(--lc-text)]">{member.name}</p>
                  <div className="flex items-center gap-2 text-xs text-[var(--lc-muted)]">
                    <Mail className="w-3 h-3" />
                    {member.email}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {member.role}
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onRemoveMember(member.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {teamMembers.length > 0 && (
        <div className="mt-4 pt-4 border-t border-[var(--lc-border)]">
          <div className="flex items-center justify-between text-xs text-[var(--lc-muted)]">
            <span>{teamMembers.length} team member{teamMembers.length !== 1 ? 's' : ''}</span>
            <div className="flex items-center gap-1">
              {Array.from(new Set(teamMembers.map(m => m.department))).map((dept) => (
                <Badge key={dept} variant="outline" className="text-xs border-[var(--lc-border)] text-[var(--lc-muted)]">
                  {dept}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

