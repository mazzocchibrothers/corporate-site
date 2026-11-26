// The values of the HubSpot form's Industry dropdown, by our option keys.
const HUBSPOT_INDUSTRY: Record<string, string> = {
  luxury: 'LUXURY_GOODS_JEWELRY', retail: 'RETAIL', banking: 'BANKING', insurance: 'INSURANCE',
  pharma: 'PHARMACEUTICALS', manufacturing: 'RAILROAD_MANUFACTURE', energy: 'OIL_ENERGY', other: 'Other',
};

// One consent on the form: to store and process the data (the Privacy Policy
// sentence). There is no marketing opt-in, so no communications entry is sent:
// a subscription answer to a question nobody was asked would be a false record.
export function reportSubmission({ name, email, company, industry, consent, processingText, pageUri, pageName }: {
  name: string; email: string; company: string; industry: string; consent: boolean;
  processingText: string; pageUri: string; pageName: string;
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
      consent: { consentToProcess: true, text: processingText },
    },
  };
}
