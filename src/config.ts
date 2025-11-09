/**
 * API Configuration
 * 
 * Paste your API keys here to enable real AI generation and Slack integration.
 * 
 * HOW TO GET YOUR API KEYS:
 * 
 * 1. NVIDIA Nemotron API:
 *    - Visit: https://build.nvidia.com/
 *    - Sign up for an account
 *    - Navigate to API section and generate an API key
 *    - Paste it in NEMOTRON_API_KEY below
 * 
 * 2. Slack Webhook URL:
 *    - Go to: https://api.slack.com/messaging/webhooks
 *    - Create a new Slack app or use existing one
 *    - Enable Incoming Webhooks
 *    - Create a webhook for your channel
 *    - Paste the webhook URL in SLACK_WEBHOOK_URL below
 */

export const config = {
  // ============================================
  // PASTE YOUR NVIDIA NEMOTRON API KEY HERE
  // ============================================
  NEMOTRON_API_KEY: 'YOUR_NEMOTRON_API_KEY_HERE',
  
  // NVIDIA Nemotron API endpoint
  NEMOTRON_API_URL: 'https://integrate.api.nvidia.com/v1/chat/completions',
  
  // Nemotron model to use
  NEMOTRON_MODEL: 'nvidia/llama-3.1-nemotron-70b-instruct',
  
  // ============================================
  // PASTE YOUR SLACK WEBHOOK URL HERE
  // ============================================
  SLACK_WEBHOOK_URL: 'YOUR_SLACK_WEBHOOK_URL_HERE',
  
  // ============================================
  // AI GENERATION SETTINGS (Optional)
  // ============================================
  
  // Temperature for AI responses (0.0 - 1.0)
  // Lower = more focused, Higher = more creative
  AI_TEMPERATURE: 0.7,
  
  // Maximum tokens for AI response
  AI_MAX_TOKENS: 2000,
  
  // ============================================
  // VALIDATION
  // ============================================
  
  // Check if API keys are configured
  isNemotronConfigured(): boolean {
    return this.NEMOTRON_API_KEY !== 'YOUR_NEMOTRON_API_KEY_HERE' && 
           this.NEMOTRON_API_KEY.length > 0;
  },
  
  isSlackConfigured(): boolean {
    return this.SLACK_WEBHOOK_URL !== 'YOUR_SLACK_WEBHOOK_URL_HERE' && 
           this.SLACK_WEBHOOK_URL.startsWith('https://hooks.slack.com/');
  },
};

// ============================================
// CONFIGURATION STATUS
// ============================================

if (typeof window === 'undefined') {
  // Server-side logging
  console.log('🔧 Configuration Status:');
  console.log('  Nemotron API:', config.isNemotronConfigured() ? '✓ Configured' : '✗ Not configured');
  console.log('  Slack Webhook:', config.isSlackConfigured() ? '✓ Configured' : '✗ Not configured');
  
  if (!config.isNemotronConfigured()) {
    console.warn('⚠️  Nemotron API key not configured. Please update config.ts');
  }
  
  if (!config.isSlackConfigured()) {
    console.warn('⚠️  Slack webhook not configured. Please update config.ts');
  }
}
