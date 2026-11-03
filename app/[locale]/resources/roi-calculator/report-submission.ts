// The values of the HubSpot form's Industry dropdown, by our option keys.
const HUBSPOT_INDUSTRY: Record<string, string> = {
  luxury: 'LUXURY_GOODS_JEWELRY', retail: 'RETAIL', banking: 'BANKING', insurance: 'INSURANCE',
  pharma: 'PHARMACEUTICALS', manufacturing: 'RAILROAD_MANUFACTURE', energy: 'OIL_ENERGY', other: 'Other',
};

export function reportSubmission({ name, email, company, industry, marketing, consent, consentText, processingText, pageUri, pageName }: {
  name: string; email: string; company: string; industry: string; marketing: boolean; consent: boolean;
  consentText: string; processingText: string; pageUri: string; pageName: string;
}) {
  if (!consent) throw new Error('Consent required');
  return {
    fields: [
      { name: 'firstname', value: name.trim() },
      { name: 'email', value: email.trim() },
      { name: 'company', value: company.trim() },
      { name: '0-2/industry', value: HUBSPOT_INDUSTRY[industry] },
    ],
    context: { pageUri, pageName },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: processingText,
        communications: [{ value: marketing, subscriptionTypeId: 527104760, text: consentText }],
      },
    },
  };
}
