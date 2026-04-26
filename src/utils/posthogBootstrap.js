import posthog from "posthog-js";

const key = import.meta.env.VITE_POSTHOG_KEY;
const disabled = import.meta.env.VITE_DISABLE_POSTHOG === "true";
const isDev = import.meta.env.DEV;
const allowDev = import.meta.env.VITE_POSTHOG_DEV === "true";

export function isPostHogTrackingEnabled() {
  if (!key || disabled) {
    return false;
  }
  if (isDev && !allowDev) {
    return false;
  }
  return true;
}

if (isPostHogTrackingEnabled()) {
  const apiHost = import.meta.env.VITE_POSTHOG_HOST || "https://eu.i.posthog.com";
  posthog.init(key, {
    api_host: apiHost,
    capture_pageview: false,
    capture_pageleave: true,
  });
}

export { posthog };
