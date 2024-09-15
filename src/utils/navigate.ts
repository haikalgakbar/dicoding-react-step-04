export default function navigate(url: string) {
  window.history.pushState({}, "", url);

  const navEvent = new PopStateEvent("popstate");

  window.dispatchEvent(navEvent);
}
