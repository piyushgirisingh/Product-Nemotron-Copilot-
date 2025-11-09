// Client-side API wrapper that calls the Express backend

import { ProductInput, LifecycleData, ReportData } from '../App';

// Backend API base URL - can be configured via environment variable
// In development, Vite proxy handles /api routes, so we can use relative URLs
// In production, use full URL or environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Helper function to handle API errors with better messaging
function handleApiError(error: unknown, defaultMessage: string): Error {
  if (error instanceof Error) {
    // Network errors
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return new Error('Unable to connect to the backend server. Please make sure the backend is running on port 5002.');
    }
    // CORS errors
    if (error.message.includes('CORS') || error.message.includes('cross-origin')) {
      return new Error('CORS error: Backend server may not be configured to allow requests from this origin.');
    }
    return error;
  }
  return new Error(defaultMessage);
}

// Health check function to test backend connection
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const url = API_BASE_URL ? `${API_BASE_URL}/health` : '/health';
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.ok;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
}

export const api = {
  async generateLifecycle(input: ProductInput): Promise<LifecycleData> {
    try {
      const url = API_BASE_URL ? `${API_BASE_URL}/api/generate-lifecycle` : '/api/generate-lifecycle';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage = errorData.error || `HTTP error! status: ${res.status}`;
        throw new Error(errorMessage);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error('API Client Error (generateLifecycle):', error);
      throw handleApiError(error, 'Failed to generate lifecycle plan');
    }
  },

  async generateStatus(
    lifecycleData: LifecycleData,
    productInput: ProductInput
  ): Promise<ReportData> {
    try {
      const url = API_BASE_URL ? `${API_BASE_URL}/api/generate-status` : '/api/generate-status';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lifecycleData,
          productInput,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage = errorData.error || `HTTP error! status: ${res.status}`;
        throw new Error(errorMessage);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error('API Client Error (generateStatus):', error);
      throw handleApiError(error, 'Failed to generate status report');
    }
  },

  async sendToSlack(payload: {
    productName: string;
    statusSummary: string;
    progress: number;
    doneTasks: number;
    totalTasks: number;
    nextSteps: string[];
    launchChecklist: Array<{
      item: string;
      status: 'complete' | 'in-progress' | 'pending';
    }>;
  }): Promise<void> {
    try {
      const url = API_BASE_URL ? `${API_BASE_URL}/api/send-slack` : '/api/send-slack';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage = errorData.error || `HTTP error! status: ${res.status}`;
        throw new Error(errorMessage);
      }

      await res.json();
    } catch (error) {
      console.error('API Client Error (sendToSlack):', error);
      throw handleApiError(error, 'Failed to send to Slack');
    }
  },
};
