import { checkBotId } from 'botid/server';

const HUBSPOT = 'https://api.hsforms.com/submissions/v3/integration/submit/48438018/0af34526-b132-4ada-b0b5-d4f0d9b380c2';
const SUBSCRIPTION_TYPE_ID = 527104760;
const FIELDS = ['firstname', 'email', 'company', '0-2/industry'];
const bad = () => new Response(null, { status: 400 });
const text = (value: unknown, max: number): value is string => typeof value === 'string' && value.length <= max;

// The browser posts here, not to HubSpot, so BotID can turn bots away first.
// HubSpot's own reCAPTCHA cannot be on: its submit API rejects such forms.
// The body is rebuilt from an allowlist: nothing the caller adds reaches HubSpot.
export async function POST(request: Request) {
  if ((await checkBotId()).isBot) return Response.json({ error: 'Access denied' }, { status: 403 });

  let body: any;
  try { body = JSON.parse(await request.text()); } catch { return bad(); }

  const fields = body?.fields;
  if (!Array.isArray(fields) || fields.length !== FIELDS.length) return bad();
  const clean: { name: string; value: string }[] = [];
  for (const name of FIELDS) {
    const field = fields.find((f: any) => f?.name === name);
    if (!text(field?.value, name === 'email' ? 254 : 200) || !field.value.trim()) return bad();
    clean.push({ name, value: field.value });
  }

  const consent = body?.legalConsentOptions?.consent;
  const communication = consent?.communications?.[0];
  if (consent?.consentToProcess !== true || !text(consent.text, 1000)) return bad();
  if (typeof communication?.value !== 'boolean' || !text(communication.text, 1000)) return bad();

  const { pageUri, pageName } = body?.context ?? {};
  if (!text(pageUri, 2000) || !text(pageName, 300) || !/^https?:\/\//.test(pageUri)) return bad();

  const response = await fetch(HUBSPOT, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: clean,
      context: { pageUri, pageName },
      legalConsentOptions: { consent: {
        consentToProcess: true, text: consent.text,
        communications: [{ value: communication.value, subscriptionTypeId: SUBSCRIPTION_TYPE_ID, text: communication.text }],
      } },
    }),
    signal: AbortSignal.timeout(15000),
  });
  return new Response(null, { status: response.ok ? 204 : 502 });
}
