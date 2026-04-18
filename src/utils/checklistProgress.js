export function getSafeChecklistItems(value) {
  return Array.isArray(value)
    ? value.filter((item) => item && typeof item === "object")
    : [];
}

export function getChecklistProgressPercent(items) {
  const safeItems = getSafeChecklistItems(items);

  if (safeItems.length === 0) {
    return 0;
  }

  const completedCount = safeItems.filter(
    (item) => item.checked === true
  ).length;

  return Math.round((completedCount / safeItems.length) * 100);
}
