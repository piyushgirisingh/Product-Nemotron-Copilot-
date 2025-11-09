import { Activity as ActivityIcon, CheckCircle2, UserPlus, MessageSquare, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Activity, TeamMember } from '../types/collaboration';

interface ActivityFeedProps {
  activities: Activity[];
  teamMembers: TeamMember[];
}

export function ActivityFeed({ activities, teamMembers }: ActivityFeedProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'task_created':
        return <CheckCircle2 className="w-4 h-4 text-blue-600" />;
      case 'task_updated':
        return <TrendingUp className="w-4 h-4 text-orange-600" />;
      case 'task_assigned':
        return <UserPlus className="w-4 h-4 text-green-600" />;
      case 'comment_added':
        return <MessageSquare className="w-4 h-4 text-purple-600" />;
      case 'phase_completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'status_changed':
        return <TrendingUp className="w-4 h-4 text-indigo-600" />;
      default:
        return <ActivityIcon className="w-4 h-4 text-neutral-600" />;
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  const getUserName = (userId: string) => {
    const member = teamMembers.find(m => m.id === userId);
    return member?.name || 'Unknown User';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserColor = (userId: string) => {
    const member = teamMembers.find(m => m.id === userId);
    return member?.color || 'neutral-400';
  };

  return (
    <Card className="p-6 bg-[var(--lc-surface)] border-[var(--lc-border)]">
      <div className="flex items-center gap-2 mb-4">
        <ActivityIcon className="w-5 h-5 text-indigo-400" />
        <h3 className="font-semibold text-[var(--lc-text)]">Activity Feed</h3>
      </div>

      <div className="h-[400px] overflow-y-auto pr-4">
        {activities.length === 0 ? (
          <div className="text-center py-12 text-[var(--lc-muted)]">
            <ActivityIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No activity yet</p>
            <p className="text-xs">Actions will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-3 group">
                <div className="flex-shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full bg-${getUserColor(activity.userId)} flex items-center justify-center text-white text-xs font-semibold`}
                  >
                    {getInitials(getUserName(activity.userId))}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <p className="text-sm text-[var(--lc-text)]">
                        <span className="font-medium">{getUserName(activity.userId)}</span>
                        {' '}
                        <span className="text-[var(--lc-muted)]">{activity.content}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-[var(--lc-muted)]">
                          {getTimeAgo(activity.timestamp)}
                        </span>
                        {activity.metadata && (
                          <span className="text-xs text-[var(--lc-muted)] opacity-60">
                            · {JSON.stringify(activity.metadata).slice(0, 30)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0 opacity-60">
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

