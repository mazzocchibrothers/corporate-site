export function reportSubmission({ name, email, company, industry, consent, consentText, processingText, pageUri, pageName }: {
  name: string; email: string; company: string; industry: string; consent: boolean;
  consentText: string; processingText: string; pageUri: string; pageName: string;
}) {
  if (!consent) throw new Error('Consent required');
  return {
    fields: [
      { name: 'firstname', value: name.trim() },
      { name: 'email', value: email.trim() },
      { name: 'company', value: company.trim() },
      { name: '0-2/industry', value: industry },
    ],
    context: { pageUri, pageName },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: processingText,
        communications: [{ value: true, subscriptionTypeId: 527104760, text: consentText }],
      },
    },
  };
}
