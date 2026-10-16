export function reportSubmission({ name, email, message, consent, consentText, processingText, pageUri, pageName }: {
  name: string; email: string; message: string; consent: boolean;
  consentText: string; processingText: string; pageUri: string; pageName: string;
}) {
  if (!consent) throw new Error('Consent required');
  return {
    fields: [
      { name: 'firstname', value: name.trim() },
      { name: 'email', value: email.trim() },
      // shortcut: company, sector and ROI inputs use the existing message field until a dedicated ROI form is configured.
      { name: 'message', value: message },
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
