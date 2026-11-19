// The GTM payload the navbar's "Book a Demo" button pushes. It is the same
// `book_demo_click` the Assess page sends (components/assess/track.ts), so the
// container's existing trigger and GA4 tag carry it; `location` tells the two
// apart, and `page` is the path the click came from.

export type NavbarBookDemoClick = {
  event: 'book_demo_click';
  page: string;
  location: 'navbar';
  language: string;
};

export function navbarBookDemoClickEvent(language: string, page: string): NavbarBookDemoClick {
  return { event: 'book_demo_click', page, location: 'navbar', language };
}
