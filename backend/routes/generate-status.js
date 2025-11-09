const axios = require('axios');

const NEMOTRON_API_URL = process.env.NEMOTRON_API_URL || 'https://integrate.api.nvidia.com/v1';
const NEMOTRON_API_KEY = process.env.NEMOTRON_API_KEY;
const MODEL_NAME = process.env.NEMOTRON_MODEL || 'nvidia/nemotron-nano-12b-v2-vl';

/**
 * Generate status report using Nemotron nano model
 */
async function generateStatus(req, res, next) {
  console.log('📊 Generate Status - Request received');
  
  try {
    const { lifecycleData, productInput } = req.body;

    // Validation
    if (!lifecycleData || !productInput) {
      console.log('❌ Validation error: Missing data');
      return res.status(400).json({
        error: 'lifecycleData and productInput are required',
      });
    }

    if (!NEMOTRON_API_KEY) {
      console.log('❌ API Key not configured!');
      return res.status(500).json({
        error: 'NEMOTRON_API_KEY is not configured',
      });
    }
    
    console.log('✅ Calling Nemotron API for status report...');

    // Calculate progress
    const doneTasks = lifecycleData.tasks.filter((t) => t.status === 'Done').length;
    const inProgressTasks = lifecycleData.tasks.filter((t) => t.status === 'In progress').length;
    const totalTasks = lifecycleData.tasks.length;
    const progressPercent = Math.round((doneTasks / totalTasks) * 100);

    // Prepare context for AI
    const activePhases = lifecycleData.phases.filter(
      (p) => p.status === 'active' || p.status === 'completed'
    );
    const completedPhases = lifecycleData.phases.filter((p) => p.status === 'completed');

    // Build prompt for status generation
    const prompt = `You are a product management expert creating an executive status update. Based on the following product information, generate a concise status summary, next steps, and launch checklist.

Product Name: ${productInput.name}
Description: ${productInput.description}
Timeline: ${productInput.timeline} months
Progress: ${progressPercent}% (${doneTasks}/${totalTasks} tasks completed, ${inProgressTasks} in progress)

Active Phases: ${activePhases.map((p) => p.name).join(', ')}
Completed Phases: ${completedPhases.map((p) => p.name).join(', ')}

Key Risks:
${lifecycleData.risks.map((r) => `- ${r}`).join('\n')}

KPIs:
${lifecycleData.kpis.map((k) => `- ${k}`).join('\n')}

Generate a response in the following JSON format:
{
  "statusSummary": "A 2-3 sentence executive summary of current status, progress, and overall health of the project",
  "nextSteps": [
    "Specific action item 1",
    "Specific action item 2",
    "Specific action item 3",
    "Specific action item 4"
  ],
  "launchChecklist": [
    {"item": "Checklist item 1", "status": "complete"},
    {"item": "Checklist item 2", "status": "in-progress"},
    {"item": "Checklist item 3", "status": "pending"},
    {"item": "Checklist item 4", "status": "pending"},
    {"item": "Checklist item 5", "status": "pending"}
  ]
}

Status options for checklist: "complete", "in-progress", "pending"
Make the status summary professional and data-driven.
Next steps should be specific and actionable.
Launch checklist should cover: Product readiness, Documentation, Marketing/GTM, Technical infrastructure, Team readiness

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

    // Extract content from response
    const content = response.data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content received from Nemotron API');
    }

    // Parse JSON response
    let reportData;
    try {
      // Try to extract JSON from response (in case there's extra text)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        reportData = JSON.parse(jsonMatch[0]);
      } else {
        reportData = JSON.parse(content);
      }
    } catch (parseError) {
      console.error('Failed to parse JSON:', content);
      throw new Error('Invalid JSON response from Nemotron API');
    }

    // Validate response structure
    if (
      !reportData.statusSummary ||
      !reportData.nextSteps ||
      !reportData.launchChecklist
    ) {
      throw new Error('Invalid response structure from API');
    }

    res.json(reportData);
  } catch (error) {
    console.error('Error generating status:', error);

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

module.exports = { generateStatus };

