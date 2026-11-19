// The GTM payload the Skillvue Assess page pushes when a visitor clicks its
// closing "book a demo" button. One place for the event's shape, as
// components/demo/track.ts is for `demo_view`: the event reaches GA only once a
// GTM trigger listens for `book_demo_click`.

export type BookDemoClick = {
  event: 'book_demo_click';
  page: 'product/skillvue-assess';
  location: 'closing';
  language: string;
};

export function bookDemoClickEvent(language: string): BookDemoClick {
  return { event: 'book_demo_click', page: 'product/skillvue-assess', location: 'closing', language };
}
