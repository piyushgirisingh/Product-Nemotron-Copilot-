const axios = require('axios');

const NEMOTRON_API_URL = process.env.NEMOTRON_API_URL || 'https://integrate.api.nvidia.com/v1';
const NEMOTRON_API_KEY = process.env.NEMOTRON_API_KEY;
const MODEL_NAME = process.env.NEMOTRON_MODEL || 'nvidia/nemotron-nano-12b-v2-vl';

/**
 * Generate lifecycle plan using Nemotron nano model
 */
async function generateLifecycle(req, res, next) {
  console.log('📝 Generate Lifecycle - Request received');
  console.log('Request body:', req.body);
  
  try {
    const { name, description, targetUsers, timeline } = req.body;

    // Validation
    if (!name || !description) {
      console.log('❌ Validation error: Missing name or description');
      return res.status(400).json({
        error: 'Product name and description are required',
      });
    }

    if (!NEMOTRON_API_KEY) {
      console.log('❌ API Key not configured!');
      return res.status(500).json({
        error: 'NEMOTRON_API_KEY is not configured',
      });
    }
    
    console.log('✅ Validation passed, calling Nemotron API...');

    // Build prompt for lifecycle generation
    const prompt = `You are a product management expert. Generate a comprehensive product lifecycle plan for the following product:

Product Name: ${name}
Description: ${description}
Target Users: ${targetUsers || 'General users'}
Timeline: ${timeline} months

Please provide a detailed lifecycle plan in the following JSON format:
{
  "phases": [
    {"name": "Discovery", "description": "brief description", "status": "active"},
    {"name": "Design", "description": "brief description", "status": "upcoming"},
    {"name": "Build", "description": "brief description", "status": "upcoming"},
    {"name": "Test", "description": "brief description", "status": "upcoming"},
    {"name": "Launch", "description": "brief description", "status": "upcoming"},
    {"name": "Post-launch", "description": "brief description", "status": "upcoming"}
  ],
  "tasks": [
    {"id": "1", "phase": "Discovery", "task": "task description", "priority": "P0", "status": "Not started"},
    {"id": "2", "phase": "Discovery", "task": "task description", "priority": "P1", "status": "Not started"},
    ... (15-20 tasks total, distributed across phases)
  ],
  "risks": [
    "risk description 1",
    "risk description 2",
    ... (5-7 risks)
  ],
  "kpis": [
    "KPI description 1",
    "KPI description 2",
    ... (5-7 KPIs)
  ]
}

Priority levels: P0 (Critical), P1 (Important), P2 (Nice-to-have)
Status options: "Not started", "In progress", "Done"
Phase status options: "active", "upcoming", "completed"

Respond ONLY with valid JSON, no additional text.`;

    // Prepare messages for Nemotron API
    const messages = [
      {
        role: 'system',
        content: '/think',
      },
      {
        role: 'user',
        content: prompt,
      },
    ];

    // Request payload
    const payload = {
      max_tokens: 4096,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      messages: messages,
      stream: false,
      model: MODEL_NAME,
    };

    // Make request to Nemotron API
    // Handle both base URL and full URL formats
    const apiUrl = NEMOTRON_API_URL.includes('/chat/completions')
      ? NEMOTRON_API_URL
      : `${NEMOTRON_API_URL}/chat/completions`;
    
    console.log('🚀 Sending request to Nemotron API:', apiUrl);
    
    const response = await axios.post(
      apiUrl,
      payload,
      {
        headers: {
          Authorization: `Bearer ${NEMOTRON_API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    console.log('✅ Received response from Nemotron API, status:', response.status);

    // Extract content from response
    const content = response.data.choices[0]?.message?.content;

    if (!content) {
      console.log('❌ No content in API response');
      throw new Error('No content received from Nemotron API');
    }

    console.log('📄 Response content received, parsing JSON...');

    // Parse JSON response
    let lifecycleData;
    try {
      // Try to extract JSON from response (in case there's extra text)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        lifecycleData = JSON.parse(jsonMatch[0]);
      } else {
        lifecycleData = JSON.parse(content);
      }
      console.log('✅ JSON parsed successfully');
    } catch (parseError) {
      console.error('❌ Failed to parse JSON:', content);
      throw new Error('Invalid JSON response from Nemotron API');
    }

    // Validate response structure
    if (
      !lifecycleData.phases ||
      !lifecycleData.tasks ||
      !lifecycleData.risks ||
      !lifecycleData.kpis
    ) {
      console.log('❌ Invalid response structure');
      throw new Error('Invalid response structure from API');
    }

    console.log('✅ Lifecycle data validated, sending response');
    res.json(lifecycleData);
  } catch (error) {
    console.error('❌ Error generating lifecycle:', error);

    if (error.response) {
      // API error response
      const status = error.response.status;
      const message = error.response.data?.error?.message || error.response.data?.message || error.message;

      if (status === 401 || status === 403) {
        return res.status(401).json({
          error: 'Invalid API key. Please check your NEMOTRON_API_KEY.',
        });
      }

      return res.status(status).json({
        error: `Nemotron API error: ${message}`,
      });
    }

    if (error.message.includes('Failed to parse JSON')) {
      return res.status(500).json({
        error: 'Failed to parse response from Nemotron API',
      });
    }

    next(error);
  }
}

module.exports = { generateLifecycle };

