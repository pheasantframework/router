
export function initState(uri, state = {}) {
  history.replaceState(state, null, uri);
}
