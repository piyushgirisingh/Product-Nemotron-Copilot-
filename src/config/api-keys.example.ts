/**
 * API CONFIGURATION TEMPLATE
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Copy this file to `api-keys.ts` in the same directory:
 *    cp config/api-keys.example.ts config/api-keys.ts
 * 
 * 2. Open `config/api-keys.ts` and paste your real API keys
 * 
 * 3. Never commit `api-keys.ts` to version control
 *    (it's already in .gitignore)
 * 
 * HOW TO GET YOUR KEYS:
 * 
 * 1. NVIDIA Nemotron API:
 *    Visit: https://build.nvidia.com/nvidia/nemotron-4-340b-instruct
 *    Sign up and get your free API key
 * 
 * 2. Slack Webhook (Optional):
 *    Visit: https://api.slack.com/messaging/webhooks
 *    Create an incoming webhook for your workspace
 */

export const API_CONFIG = {
  /**
   * NVIDIA Nemotron API Key
   * Get your key from: https://build.nvidia.com/
   */
  NEMOTRON_API_KEY: 'PASTE_YOUR_NEMOTRON_API_KEY_HERE',

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
    NAME: 'nvidia/nemotron-4-340b-instruct',
    TEMPERATURE: 0.7,
    MAX_TOKENS: 2048,
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
