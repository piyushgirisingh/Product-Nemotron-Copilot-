import { AlertCircle, CheckCircle2, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { isConfigured } from '../config/api-keys';

export function ApiStatusBanner() {
  const config = isConfigured();

  // If everything is configured, don't show the banner
  if (config.nemotron) {
    return null;
  }

  return (
    <Alert className="bg-blue-50 border-blue-200 mb-6">
      <AlertCircle className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-sm text-blue-900">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium">Real AI not enabled.</span> 
            <span className="ml-1">
              Get your free NVIDIA API key to unlock AI-powered lifecycle planning.
            </span>
          </div>
          <a
            href="https://build.nvidia.com/nvidia/nemotron-4-340b-instruct"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-blue-700 hover:text-blue-900 font-medium whitespace-nowrap ml-4"
          >
            Get API Key
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="mt-2 text-xs text-blue-700">
          📖 Setup guide: Open <code className="bg-blue-100 px-1.5 py-0.5 rounded">/config/api-keys.ts</code> and paste your key
        </div>
      </AlertDescription>
    </Alert>
  );
}
