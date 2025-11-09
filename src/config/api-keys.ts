/**
 * API CONFIGURATION
 * 
 * Paste your API keys below to enable real AI-powered features.
 * 
 * HOW TO GET YOUR KEYS:
 * 
 * 1. NVIDIA Nemotron API:
 *    - Visit: https://build.nvidia.com/nvidia/nemotron-4-340b-instruct
 *    - Sign up and get your API key
 *    - Paste it below in NEMOTRON_API_KEY
 * 
 * 2. Slack Webhook (Optional):
 *    - Visit: https://api.slack.com/messaging/webhooks
 *    - Create an incoming webhook for your workspace
 *    - Paste the webhook URL below in SLACK_WEBHOOK_URL
 * 
 * SECURITY NOTE:
 * - Never commit this file with real keys to public repositories
 * - In production, use environment variables instead
 */

export const API_CONFIG = {
  /**
   * NVIDIA Nemotron API Key
   * Get your key from: https://build.nvidia.com/
   */
  NEMOTRON_API_KEY: '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',

  /**
   * NVIDIA API Base URL
   * Default: https://integrate.api.nvidia.com/v1
   */
  NEMOTRON_API_URL: 'https://integrate.api.nvidia.com/v1',

  /**
   * Slack Webhook URL (Optional)
   * Get from: https://api.slack.com/messaging/webhooks
   */
  SLACK_WEBHOOK_URL: 'PASTE_YOUR_SLACK_WEBHOOK_URL_HERE',

  /**
   * AI Model Configuration
   */
  MODEL: {
    NAME: 'nvidia/llama-3.1-nemotron-70b-instruct',
    TEMPERATURE: 0.5,
    TOP_P: 1,
    MAX_TOKENS: 1024,
    FREQUENCY_PENALTY: 0,
    PRESENCE_PENALTY: 0,
  },
};

/**
 * Check if API keys are configured
 */
export const isConfigured = () => {
  const hasNemotron = API_CONFIG.NEMOTRON_API_KEY !== 'PASTE_YOUR_NEMOTRON_API_KEY_HERE' 
    && API_CONFIG.NEMOTRON_API_KEY.length > 0;
  
  const hasSlack = API_CONFIG.SLACK_WEBHOOK_URL !== 'PASTE_YOUR_SLACK_WEBHOOK_URL_HERE'
    && API_CONFIG.SLACK_WEBHOOK_URL.startsWith('https://hooks.slack.com/');

  return {
    nemotron: hasNemotron,
    slack: hasSlack,
  };
};
