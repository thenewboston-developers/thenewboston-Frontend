import {
  ANALYTICS_SCROLL_ROOT_SELECTOR,
  analyticsArea,
  analyticsScrollRoot,
  analyticsTarget,
} from './analyticsAttributes';

describe('analytics click names', () => {
  it('names the part of the page and the control with the attributes autocapture reports', () => {
    expect(analyticsArea('navigation')).toEqual({'data-ph-capture-attribute-click_area': 'navigation'});
    expect(analyticsTarget('create_post')).toEqual({'data-ph-capture-attribute-click_target': 'create_post'});
  });

  it('marks a scroll container with the class that the scroll depth selector matches', () => {
    const container = document.createElement('div');
    container.className = `page ${analyticsScrollRoot.className}`;

    expect(container.matches(ANALYTICS_SCROLL_ROOT_SELECTOR)).toBe(true);
    expect(document.createElement('div').matches(ANALYTICS_SCROLL_ROOT_SELECTOR)).toBe(false);
  });

  it('turns a label into a name', () => {
    expect(analyticsTarget('Sign in')).toEqual({'data-ph-capture-attribute-click_target': 'sign_in'});
    expect(analyticsTarget('Log out')).toEqual({'data-ph-capture-attribute-click_target': 'log_out'});
  });
});
