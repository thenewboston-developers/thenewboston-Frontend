// "Sign in" and "sign_in" both become "sign_in", so a control's label can double as its name
const getClickName = (name: string): string => name.toLowerCase().replace(/[^a-z0-9]+/g, '_');

/**
 * Autocapture masks element text and attributes, which leaves clicks indistinguishable from one another. These props
 * give an element a name that is reported with every click, dead click and rage click on it or inside it: the area is
 * the part of the page, the target is the control. The innermost name wins. Names are static and never hold user data.
 */
export const analyticsArea = (name: string) => ({'data-ph-capture-attribute-click_area': getClickName(name)});

export const analyticsTarget = (name: string) => ({'data-ph-capture-attribute-click_target': getClickName(name)});

/**
 * Marks the element that a page scrolls in. Most pages scroll in the main area, but some scroll in a container of
 * their own, and scroll depth is only meaningful when it is measured in the element that actually moves.
 */
export const analyticsScrollRoot = {className: 'analytics-scroll-root'};

export const ANALYTICS_SCROLL_ROOT_SELECTOR = `.${analyticsScrollRoot.className}`;
