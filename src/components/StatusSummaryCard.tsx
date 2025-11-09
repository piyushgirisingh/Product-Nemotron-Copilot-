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
    return <div className="w-4 h-4 border-2 border-neutral-300 rounded-sm"></div>;
  };

  return (
    <Card className="p-6 bg-white border border-neutral-200 shadow-sm rounded-xl relative">
      <h2 className="text-neutral-900 mb-6">4. AI status & launch summary</h2>
      
      {!reportData ? (
        <div className="space-y-5">
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <p className="text-sm text-neutral-600 leading-relaxed">
              Generate an AI-powered executive summary with status update, next steps, and launch readiness checklist. Perfect for stakeholder communication.
            </p>
          </div>
          
          {statusError && (
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">{statusError}</AlertDescription>
            </Alert>
          )}
          
          <div className="flex items-center justify-between">
            <p className="text-xs text-neutral-500">
              {hasLifecycleData ? 'Ready to generate' : 'Generate a lifecycle plan first'}
            </p>
            <Button
              onClick={onGenerateStatus}
              disabled={!hasLifecycleData || isGeneratingStatus}
              className="bg-blue-600 hover:bg-blue-700 shadow-sm px-5"
            >
              {isGeneratingStatus ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Status & GTM Summary
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <h3 className="text-sm font-medium text-neutral-900 mb-2">Status Summary</h3>
            <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
              {reportData.statusSummary}
            </p>
          </div>
          
          <Separator className="bg-neutral-200" />
          
          <div>
            <h3 className="text-sm font-medium text-neutral-900 mb-3">Next Steps</h3>
            <ul className="space-y-2">
              {reportData.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-2.5 text-neutral-700">
                  <span className="text-blue-500 mt-1 text-xs">→</span>
                  <span className="text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <Separator className="bg-neutral-200" />
          
          <div>
            <h3 className="text-sm font-medium text-neutral-900 mb-3">Launch Checklist</h3>
            <ul className="space-y-2">
              {reportData.launchChecklist.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-2.5 ${
                    item.status === 'pending' ? 'text-neutral-400' : 'text-neutral-700'
                  }`}
                >
                  {getCheckIcon(item.status)}
                  <span className="text-sm">{item.item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              <span>Ready to share</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleCopy}
                className="border-neutral-300 text-neutral-700 hover:bg-neutral-50"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy status
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 shadow-sm"
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
                    <Send className="w-4 h-4 mr-2" />
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
