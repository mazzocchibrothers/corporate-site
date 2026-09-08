export const CAROUSEL_CLICK_SUPPRESS_THRESHOLD = 6;

export const wrapCarouselOffset = (value: number, width: number) =>
  width ? ((value % width) + width) % width : value;

export const shouldSuppressCarouselClick = (distance: number) =>
  distance > CAROUSEL_CLICK_SUPPRESS_THRESHOLD;
