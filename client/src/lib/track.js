import { apiPost } from "./api.js";

export function track(type, path, meta = {}) {
  // fire-and-forget (don’t block UI)
  apiPost("/api/analytics", { type, path, meta }).catch(() => {});
}

export function trackPageView(path) {
  track("page_view", path);
}
