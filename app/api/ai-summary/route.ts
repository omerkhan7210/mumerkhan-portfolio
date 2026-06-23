import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_TOOLS = ['Website Cost Calculator', 'Automation ROI Calculator'];

export async function POST(req: NextRequest) {
  try {
    const { tool, inputs = {}, breakdown = [] } = await req.json();

    if (!ALLOWED_TOOLS.includes(tool)) {
      return NextResponse.json({ error: 'Unknown tool.' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'AI summary unavailable.' }, { status: 503 });
    }

    const breakdownLines = (breakdown as { label: string; amount: number }[])
      .map((b) => `- ${b.label}: $${Math.round(b.amount).toLocaleString()}`)
      .join('\n');

    const prompt = `Tool: ${tool}
User inputs: ${JSON.stringify(inputs)}
Cost/savings breakdown:
${breakdownLines}

Write a 2-3 sentence personalized takeaway for this person based on their specific answers above. Reference at least one concrete detail from their inputs or breakdown. Be direct and consultative, not generic. No greeting, no sign-off, no markdown — plain prose only.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You write short, specific, consultative takeaways for a freelance web developer/automation consultant\'s pricing calculators. You never invent numbers not given to you.',
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: 160,
        temperature: 0.6,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI request failed:', response.status, await response.text());
      return NextResponse.json({ error: 'AI summary unavailable.' }, { status: 502 });
    }

    const data = await response.json();
    const summary = data?.choices?.[0]?.message?.content?.trim();

    if (!summary) {
      return NextResponse.json({ error: 'AI summary unavailable.' }, { status: 502 });
    }

    return NextResponse.json({ summary });
  } catch (err) {
    console.error('AI summary generation failed:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
