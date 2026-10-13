// Structure only. Every string a visitor reads lives in the catalogue under
// customers.partners.network.items, keyed on the slug.
export type PartnerCategory = 'learning' | 'consulting';

export const partners: {
  slug: string;
  category: PartnerCategory;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  // Rendered height cap. A compact mark needs more height than a long
  // wordmark to read at the same visual weight.
  logoMaxHeight: number;
  url: string;
}[] = [
  {
    slug: 'flowsparks',
    category: 'learning',
    logo: '/logos/flowsparks-logo.png',
    logoWidth: 987,
    logoHeight: 181,
    logoMaxHeight: 64,
    url: 'https://www.flowsparks.com',
  },
  {
    slug: 'easygenerator',
    category: 'learning',
    logo: '/logos/easygenerator-logo.svg',
    logoWidth: 228,
    logoHeight: 81,
    logoMaxHeight: 84,
    url: 'https://www.easygenerator.com/en/',
  },
];
