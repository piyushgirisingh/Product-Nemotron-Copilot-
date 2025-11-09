// Real API endpoint for generating status summary using NVIDIA Nemotron

import { LifecycleData, ProductInput, ReportData } from '../App';
import { API_CONFIG } from '../config/api-keys';

export async function generateStatus(
  lifecycleData: LifecycleData,
  productInput: ProductInput
): Promise<ReportData> {
  // Calculate progress
  const doneTasks = lifecycleData.tasks.filter(t => t.status === 'Done').length;
  const inProgressTasks = lifecycleData.tasks.filter(t => t.status === 'In progress').length;
  const totalTasks = lifecycleData.tasks.length;
  const progressPercent = Math.round((doneTasks / totalTasks) * 100);

  // Prepare context for AI
  const activePhases = lifecycleData.phases.filter(p => p.status === 'active' || p.status === 'completed');
  const completedPhases = lifecycleData.phases.filter(p => p.status === 'completed');

  const prompt = `You are a product management expert creating an executive status update. Based on the following product information, generate a concise status summary, next steps, and launch checklist.

Product Name: ${productInput.name}
Description: ${productInput.description}
Timeline: ${productInput.timeline} months
Progress: ${progressPercent}% (${doneTasks}/${totalTasks} tasks completed, ${inProgressTasks} in progress)

Active Phases: ${activePhases.map(p => p.name).join(', ')}
Completed Phases: ${completedPhases.map(p => p.name).join(', ')}

Key Risks:
${lifecycleData.risks.map(r => `- ${r}`).join('\n')}

KPIs:
${lifecycleData.kpis.map(k => `- ${k}`).join('\n')}

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

  try {
    const response = await fetch(`${API_CONFIG.NEMOTRON_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_CONFIG.NEMOTRON_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        max_tokens: 2048,
        temperature: API_CONFIG.MODEL.TEMPERATURE,
        top_p: API_CONFIG.MODEL.TOP_P,
        frequency_penalty: API_CONFIG.MODEL.FREQUENCY_PENALTY,
        presence_penalty: API_CONFIG.MODEL.PRESENCE_PENALTY,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        stream: false,
        model: API_CONFIG.MODEL.NAME,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Nemotron API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content received from API');
    }

    // Parse the JSON response
    const reportData = JSON.parse(content);

    // Validate the response structure
    if (!reportData.statusSummary || !reportData.nextSteps || !reportData.launchChecklist) {
      throw new Error('Invalid response structure from API');
    }

    return reportData;
  } catch (error) {
    console.error('Error generating status:', error);
    
    // If API fails, provide a helpful error message
    if (error instanceof Error) {
      if (error.message.includes('401') || error.message.includes('403')) {
        throw new Error('Invalid API key. Please check your Nemotron API key in /config/api-keys.ts');
      }
      throw error;
    }
    
    throw new Error('Failed to generate status report. Please check your API configuration.');
  }
}

// Example API route handler (Next.js format)
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { lifecycleData, productInput } = req.body;
    const reportData = await generateStatus(lifecycleData, productInput);
    res.status(200).json(reportData);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to generate status report';
    res.status(500).json({ error: message });
  }
}
