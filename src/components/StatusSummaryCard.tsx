import { Copy, Send, Check, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';
import { ReportData } from '../App';

interface StatusSummaryCardProps {
  reportData: ReportData | null;
  onGenerateStatus: () => void;
  onSendToSlack: () => Promise<boolean>;
  isGeneratingStatus: boolean;
  isSendingSlack: boolean;
  statusError: string | null;
  hasLifecycleData: boolean;
}

export function StatusSummaryCard({
  reportData,
  onGenerateStatus,
  onSendToSlack,
  isGeneratingStatus,
  isSendingSlack,
  statusError,
  hasLifecycleData,
}: StatusSummaryCardProps) {
  const handleCopy = () => {
    if (!reportData) return;
    
    const statusText = `
STATUS UPDATE

${reportData.statusSummary}

NEXT STEPS:
${reportData.nextSteps.map(step => `• ${step}`).join('\n')}

LAUNCH CHECKLIST:
${reportData.launchChecklist.map(item => {
  const icon = item.status === 'complete' ? '✓' : item.status === 'in-progress' ? '⧖' : '☐';
  return `${icon} ${item.item}`;
}).join('\n')}
    `.trim();
    
    navigator.clipboard.writeText(statusText);
    toast.success('Copied to clipboard', {
      description: 'Status update ready to paste',
    });
  };

  const handleSendToSlackClick = async () => {
    try {
      await onSendToSlack();
      toast.success('Sent to Slack ✓', {
        description: 'Your team has been notified',
      });
    } catch (error) {
      toast.error('Failed to send', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    }
  };

  const getCheckIcon = (status: 'complete' | 'in-progress' | 'pending') => {
    if (status === 'complete') {
      return <Check className="w-4 h-4 text-green-600" />;
    }
    if (status === 'in-progress') {
      return (
        <div className="w-4 h-4 border-2 border-blue-600 rounded-sm flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
        </div>
      );
    }
      return <div className="w-4 h-4 border-2 border-[var(--lc-border)] rounded-sm"></div>;
  };

  return (
    <Card className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-sm">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-[var(--lc-text)] font-semibold">AI Status & Launch Summary</h2>
        </div>
      
      {!reportData ? (
        <div className="space-y-5">
          <div className="p-5 bg-[var(--lc-surface-soft)] rounded-xl border border-[var(--lc-border)] group/hint hover:border-[var(--lc-accent)] transition-colors duration-150">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-400 mt-0.5 group-hover/hint:animate-pulse" />
              <p className="text-sm text-[var(--lc-muted)] leading-relaxed">
                Generate an AI-powered executive summary with status update, next steps, and launch readiness checklist. Perfect for stakeholder communication.
              </p>
            </div>
          </div>
          
          {statusError && (
            <Alert variant="destructive" className="border-red-800 bg-red-900/20">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">{statusError}</AlertDescription>
            </Alert>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {hasLifecycleData && <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>}
              <p className="text-xs text-[var(--lc-muted)]">
                {hasLifecycleData ? 'Ready to generate' : 'Generate a lifecycle plan first'}
              </p>
            </div>
            <Button
              onClick={onGenerateStatus}
              disabled={!hasLifecycleData || isGeneratingStatus}
              variant="primary"
            >
              {isGeneratingStatus ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                  Generate Status & GTM Summary
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className="p-5 bg-[var(--lc-surface-soft)] rounded-xl border border-[var(--lc-border)] hover:border-[var(--lc-accent)] transition-colors duration-150 group/section">
            <h3 className="text-sm font-semibold text-[var(--lc-text)] mb-3 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-blue-500"></span>
              Status Summary
            </h3>
            <p className="text-sm text-[var(--lc-muted)] leading-relaxed whitespace-pre-line">
              {reportData.statusSummary}
            </p>
          </div>
          
          <Separator className="bg-[var(--lc-border)]" />
          
          <div>
            <h3 className="text-sm font-semibold text-[var(--lc-text)] mb-4 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
              Next Steps
            </h3>
            <ul className="space-y-3">
              {reportData.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3 text-[var(--lc-muted)] p-2.5 rounded-lg hover:bg-[var(--lc-surface)] transition-colors duration-150 group/item">
                  <span className="text-emerald-400 mt-1 text-sm group-hover/item:scale-125 transition-transform">
                    →
                  </span>
                  <span className="text-sm leading-relaxed group-hover/item:text-[var(--lc-text)] transition-colors duration-150">{step}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <Separator className="bg-[var(--lc-border)]" />
          
          <div>
            <h3 className="text-sm font-semibold text-[var(--lc-text)] mb-4 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-purple-500"></span>
              Launch Checklist
            </h3>
            <ul className="space-y-3">
              {reportData.launchChecklist.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors duration-150 group/item hover:bg-[var(--lc-surface)] ${
                    item.status === 'pending' ? 'text-[var(--lc-muted)]' : 'text-[var(--lc-muted)]'
                  }`}
                >
                  <div className="group-hover/item:scale-110 transition-transform">
                    {getCheckIcon(item.status)}
                  </div>
                  <span className="text-sm">{item.item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center justify-between pt-5 border-t border-[var(--lc-border)]">
            <div className="flex items-center gap-2 text-xs text-[var(--lc-muted)]">
              <div className="relative">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></div>
              </div>
              <span>Ready to share</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleCopy}
              >
                <Copy className="w-4 h-4 mr-2 group-hover/copy:scale-110 transition-transform" />
                Copy status
              </Button>
              <Button
                variant="primary"
                onClick={handleSendToSlackClick}
                disabled={isSendingSlack}
              >
                {isSendingSlack ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2 group-hover/send:translate-x-1 transition-transform" />
                    Send to Slack
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
