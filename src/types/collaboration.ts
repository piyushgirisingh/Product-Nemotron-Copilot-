/**
 * Types for cross-functional collaboration features
 */

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Product Manager' | 'Engineering' | 'Design' | 'Marketing' | 'Sales' | 'Executive';
  department: 'Product' | 'Engineering' | 'Design' | 'Marketing' | 'Sales' | 'Executive';
  avatar?: string;
  color: string; // For avatar background
}

export interface TaskAssignment {
  taskId: string;
  assignedTo: string[]; // Array of team member IDs
  assignedBy: string; // Team member ID who assigned
  assignedAt: Date;
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: Date;
  mentions: string[]; // Array of user IDs mentioned
  parentId?: string; // For threaded replies
}

export interface Activity {
  id: string;
  type: 'task_created' | 'task_updated' | 'task_assigned' | 'comment_added' | 'phase_completed' | 'status_changed';
  userId: string;
  taskId?: string;
  phaseId?: string;
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'mention' | 'assignment' | 'comment_reply' | 'task_update' | 'phase_approval';
  content: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export interface StakeholderPermission {
  userId: string;
  role: 'owner' | 'editor' | 'viewer' | 'stakeholder';
  canEdit: boolean;
  canComment: boolean;
  canAssign: boolean;
  canApprove: boolean;
}

export const ROLE_COLORS: Record<string, string> = {
  'Product Manager': 'bg-blue-500',
  'Engineering': 'bg-purple-500',
  'Design': 'bg-pink-500',
  'Marketing': 'bg-orange-500',
  'Sales': 'bg-green-500',
  'Executive': 'bg-red-500',
};

export const DEPARTMENT_COLORS: Record<string, string> = {
  'Product': 'blue',
  'Engineering': 'purple',
  'Design': 'pink',
  'Marketing': 'orange',
  'Sales': 'green',
  'Executive': 'red',
};

