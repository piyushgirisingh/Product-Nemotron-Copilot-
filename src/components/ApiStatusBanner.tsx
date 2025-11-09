import { AlertCircle, CheckCircle2, ExternalLink, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { useEffect, useState } from 'react';
import { checkBackendHealth } from '../lib/api-client';

export function ApiStatusBanner() {
  const [backendConnected, setBackendConnected] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  // Check backend connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      setIsChecking(true);
      try {
        const connected = await checkBackendHealth();
        setBackendConnected(connected);
      } catch (error) {
        console.error('Backend health check error:', error);
        setBackendConnected(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkConnection();
    // Check every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  // Show backend connection status if not connected
  if (backendConnected === false || isChecking) {
    return (
      <Alert className={`mb-6 ${backendConnected === false ? 'bg-amber-900/20 border-amber-700' : 'bg-blue-900/20 border-blue-700'}`}>
        {isChecking ? (
          <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />
        ) : (
          <AlertCircle className="h-4 w-4 text-amber-400" />
        )}
        <AlertDescription className="text-sm text-[var(--lc-text)]">
          {isChecking ? (
            <span className="text-blue-300">Checking backend connection...</span>
          ) : (
            <div>
              <span className="font-medium text-amber-300">Backend server not connected.</span>
              <span className="ml-1 text-amber-400">
                Please make sure the backend server is running on port 5002.
              </span>
              <div className="mt-2 text-xs text-amber-400">
                💡 Start the backend: <code className="bg-amber-900/50 px-1.5 py-0.5 rounded text-amber-200">cd backend && npm run dev</code>
              </div>
            </div>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  // Backend is connected, don't show banner
  return null;
}
