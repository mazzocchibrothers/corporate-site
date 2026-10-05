interface Window {
  dataLayer?: Array<Record<string, unknown>>;
  hbspt?: {
    forms: {
      create(options: {
        portalId: string;
        formId: string;
        region: string;
        target: string;
        onFormReady?: () => void;
        onFormSubmitted?: () => void;
        /** Shown in place of the form on submit; overrides the form's own redirect. */
        inlineMessage?: string;
      }): void;
    };
  };
}
