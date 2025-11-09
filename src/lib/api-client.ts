// Client-side API wrapper that simulates API calls
// In a real Next.js app, these would call actual API routes

import { ProductInput, LifecycleData, ReportData } from '../App';

// Simulate API calls using the mock implementations
import { generateLifecycle } from '../api/generate-lifecycle';
import { generateStatus } from '../api/generate-status';
import { sendToSlack } from '../api/send-slack';

export const api = {
  async generateLifecycle(input: ProductInput): Promise<LifecycleData> {
    try {
      // In production: const res = await fetch('/api/generate-lifecycle', ...)
      // For now, simulate the API call directly
      return await generateLifecycle(input);
    } catch (error) {
      console.error('API Client Error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to generate lifecycle plan');
    }
  },

  async generateStatus(
    lifecycleData: LifecycleData,
    productInput: ProductInput
  ): Promise<ReportData> {
    try {
      // In production: const res = await fetch('/api/generate-status', ...)
      return await generateStatus(lifecycleData, productInput);
    } catch (error) {
      throw new Error('Failed to generate status report');
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
      // In production: const res = await fetch('/api/send-slack', ...)
      await sendToSlack(payload);
    } catch (error) {
      throw new Error('Failed to send to Slack');
    }
  },
};
