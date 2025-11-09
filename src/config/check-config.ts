/**
 * Configuration Checker
 * Run this to verify your API keys are set up correctly
 */

import { API_CONFIG, isConfigured } from './api-keys';

export function checkConfiguration() {
  console.log('\n🔍 Checking API Configuration...\n');
  
  const config = isConfigured();
  
  // Check Nemotron API
  if (config.nemotron) {
    console.log('✅ NVIDIA Nemotron API: Configured');
    console.log(`   Key: ${API_CONFIG.NEMOTRON_API_KEY.substring(0, 10)}...`);
    console.log(`   URL: ${API_CONFIG.NEMOTRON_API_URL}`);
  } else {
    console.log('❌ NVIDIA Nemotron API: Not configured');
    console.log('   📖 See: QUICK_START_API.md');
    console.log('   🔗 Get key: https://build.nvidia.com/');
  }
  
  console.log('');
  
  // Check Slack webhook
  if (config.slack) {
    console.log('✅ Slack Webhook: Configured');
    console.log(`   URL: ${API_CONFIG.SLACK_WEBHOOK_URL.substring(0, 30)}...`);
  } else {
    console.log('⚠️  Slack Webhook: Not configured (optional)');
    console.log('   🔗 Get webhook: https://api.slack.com/messaging/webhooks');
  }
  
  console.log('\n');
  
  // Overall status
  if (config.nemotron) {
    console.log('🎉 Your app is ready to use real AI!\n');
  } else {
    console.log('⏳ Setup required: Add your NVIDIA API key to /config/api-keys.ts\n');
  }
  
  return config;
}

// Run if executed directly
if (require.main === module) {
  checkConfiguration();
}
