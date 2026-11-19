// The GTM payload the announcement bar above the navbar pushes when its link is
// clicked. One place for the event's shape, as components/demo/track.ts is for
// `demo_view`: the event reaches GA once a GTM trigger listens for
// `announcement_click`. `announcement` names the campaign, so the next banner
// reports apart from this one; GA adds the page it was clicked on by itself.

export const ANNOUNCEMENT_ID = 'skillvue-assess-launch';

export type AnnouncementClick = {
  event: 'announcement_click';
  announcement: string;
  language: string;
};

export function announcementClickEvent(language: string): AnnouncementClick {
  return { event: 'announcement_click', announcement: ANNOUNCEMENT_ID, language };
}
