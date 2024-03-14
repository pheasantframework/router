/**
 * Base object for push state events
 * 
 * A push state event is an event used to denote the navigation to another url in a SPA
 * 
 * This is the opposite of `popstate` events, which are called when navigating backwards.
 */
export const pushEvent = new CustomEvent('pushstate');

// NOTE: Web API. Do not use outside the web.
/**
 * Function used to navigate to a certain url - `uri` - in a SPA application.
 * This function should be used when navigating with the `SPARouter` router.
 * 
 * @param {string} uri - The target url to navigate to
 * @param {object} state - The state object to pass when navigating to the target uri
 * @param details - Any details to pass to the event to be emitted after this change
 */
export function navigateTo(uri, state = {}, details) {
    let event = pushEvent;
    if (details) {
        event = new CustomEvent('pushstate', {
            detail: details ?? {}
        });
    }
    history.pushState(state, null, uri);
    dispatchEvent(event);
}

/**
 * Function used to navigate backwards, or "pop".
 */
export function navigateBack() {
    history.back();
}

