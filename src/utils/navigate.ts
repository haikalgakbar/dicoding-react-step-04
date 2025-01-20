export default function navigate(url: string) {
  const navEvent = new PopStateEvent("popstate");
  window.history.pushState({}, "", url);
  window.dispatchEvent(navEvent);
}
