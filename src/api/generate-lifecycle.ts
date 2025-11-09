// Real API endpoint for generating lifecycle data using NVIDIA Nemotron

import { ProductInput, LifecycleData } from '../App';
import { API_CONFIG } from '../config/api-keys';

export async function generateLifecycle(input: ProductInput): Promise<LifecycleData> {
  // Call NVIDIA Nemotron API
  const prompt = `You are a product management expert. Generate a comprehensive product lifecycle plan for the following product:

Product Name: ${input.name}
Description: ${input.description}
Target Users: ${input.targetUsers || 'General users'}
Timeline: ${input.timeline} months

Please provide a detailed lifecycle plan in the following JSON format:
{
  "phases": [
    {"name": "Discovery", "description": "brief description", "status": "active"},
    {"name": "Design", "description": "brief description", "status": "upcoming"},
    ... (6 phases total: Discovery, Design, Build, Test, Launch, Post-launch)
  ],
  "tasks": [
    {"id": "1", "phase": "Discovery", "task": "task description", "priority": "P0", "status": "Not started"},
    ... (15-20 tasks total)
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

  try {
    console.log('Making request to NVIDIA API...');
    console.log('API Key (first 10 chars):', API_CONFIG.NEMOTRON_API_KEY.substring(0, 10));
    console.log('API URL:', `${API_CONFIG.NEMOTRON_API_URL}/chat/completions`);
    
    // Build payload matching the Python code exactly
    const requestBody = {
      max_tokens: API_CONFIG.MODEL.MAX_TOKENS,
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
    };
    
    console.log('Request body:', JSON.stringify(requestBody, null, 2));
    
    const response = await fetch(`${API_CONFIG.NEMOTRON_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_CONFIG.NEMOTRON_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Nemotron API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content received from API');
    }

    // Parse the JSON response
    const lifecycleData = JSON.parse(content);

    // Validate the response structure
    if (!lifecycleData.phases || !lifecycleData.tasks || !lifecycleData.risks || !lifecycleData.kpis) {
      throw new Error('Invalid response structure from API');
    }

    return lifecycleData;
  } catch (error) {
    console.error('Error generating lifecycle:', error);
    
    // If API fails, provide a helpful error message
    if (error instanceof Error) {
      if (error.message.includes('401') || error.message.includes('403')) {
        throw new Error('Invalid API key. Please check your Nemotron API key in /config/api-keys.ts');
      }
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('Network error: Unable to reach NVIDIA API. Please check your internet connection and API key.');
      }
      throw error;
    }
    
    throw new Error('Failed to generate lifecycle plan. Please check your API configuration.');
  }
}

// Example API route handler (Next.js format)
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const productInput = req.body as ProductInput;
    const lifecycleData = await generateLifecycle(productInput);
    res.status(200).json(lifecycleData);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to generate lifecycle data';
    res.status(500).json({ error: message });
  }
}
