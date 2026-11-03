import { checkBotId } from 'botid/server';

const HUBSPOT = 'https://api.hsforms.com/submissions/v3/integration/submit/48438018/0af34526-b132-4ada-b0b5-d4f0d9b380c2';

// The browser posts here, not to HubSpot, so BotID can turn bots away first.
// HubSpot's own reCAPTCHA cannot be on: its submit API rejects such forms.
export async function POST(request: Request) {
  if ((await checkBotId()).isBot) return Response.json({ error: 'Access denied' }, { status: 403 });
  const response = await fetch(HUBSPOT, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: await request.text(), signal: AbortSignal.timeout(15000),
  });
  return new Response(null, { status: response.ok ? 204 : 502 });
}
