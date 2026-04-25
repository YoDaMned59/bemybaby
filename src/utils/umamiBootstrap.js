const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;
const allowDev = import.meta.env.VITE_UMAMI_DEV === "true";
const disabled = import.meta.env.VITE_DISABLE_UMAMI === "true";

const shouldInject =
  typeof document !== "undefined" &&
  Boolean(websiteId) &&
  !disabled &&
  (import.meta.env.PROD || allowDev);

if (shouldInject && !document.querySelector(`script[data-website-id="${websiteId}"]`)) {
  const script = document.createElement("script");
  script.defer = true;
  script.src = "https://cloud.umami.is/script.js";
  script.setAttribute("data-website-id", websiteId);
  document.head.appendChild(script);
}
