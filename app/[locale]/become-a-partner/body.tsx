import HubspotLandingPage from '@/components/shared/HubspotLandingPage';

// The "Partnership Request" HubSpot form, one per language.
const FORM_IDS = {
  en: '5c2f8d21-d740-4ccb-a8f3-55065dae4e3e',
  it: '798c1db1-1afe-45ca-989b-19bfce0a2ade',
};

export default function BecomeAPartnerPage() {
  return (
    <HubspotLandingPage
      namespace="become-a-partner"
      formIds={FORM_IDS}
      leadSource="become-a-partner"
      backRouteId="customers/partners"
    />
  );
}
