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
      <Alert className={`mb-6 ${backendConnected === false ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'}`}>
        {isChecking ? (
          <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
        ) : (
          <AlertCircle className="h-4 w-4 text-amber-600" />
        )}
        <AlertDescription className="text-sm">
          {isChecking ? (
            <span className="text-blue-900">Checking backend connection...</span>
          ) : (
            <div>
              <span className="font-medium text-amber-900">Backend server not connected.</span>
              <span className="ml-1 text-amber-800">
                Please make sure the backend server is running on port 5002.
              </span>
              <div className="mt-2 text-xs text-amber-700">
                💡 Start the backend: <code className="bg-amber-100 px-1.5 py-0.5 rounded">cd backend && npm run dev</code>
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
