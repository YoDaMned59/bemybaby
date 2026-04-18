import { readStorage } from "./storage";

export function isCustomChecklistItem(item) {
  if (!item || typeof item !== "object") {
    return false;
  }

  if (item.isCustom === true) {
    return true;
  }

  const id = String(item.id ?? "");
  return id.startsWith("custom-");
}

export function normalizeReferenceItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item, index) => ({
    id:
      typeof item.id === "string" || typeof item.id === "number"
        ? String(item.id)
        : `${index}-${item.label || "item"}`,
    label: typeof item.label === "string" ? item.label : "",
    category:
      typeof item.category === "string" && item.category.trim()
        ? item.category
        : "Autres",
    checked: item.checked === true,
    isCustom: item.isCustom === true,
  }));
}

export function getInitialChecklistItems(storageKey, fallbackData) {
  const referenceItems = normalizeReferenceItems(fallbackData).map((item) => ({
    ...item,
    isCustom: false,
  }));
  const referenceIds = new Set(referenceItems.map((item) => item.id));

  const storedRaw = readStorage(storageKey, []);
  const storedItems = Array.isArray(storedRaw)
    ? storedRaw.filter((item) => item && typeof item === "object")
    : [];

  if (storedItems.length === 0) {
    return referenceItems;
  }

  const storedById = new Map(
    storedItems.map((item) => [String(item.id), item])
  );

  const mergedReference = referenceItems.map((item) => {
    const stored = storedById.get(item.id);
    return {
      ...item,
      checked: stored ? stored.checked === true : item.checked,
    };
  });

  const customItems = [];
  const seenCustomIds = new Set();

  for (const stored of storedItems) {
    const id = String(stored.id);
    if (referenceIds.has(id)) {
      continue;
    }
    if (!isCustomChecklistItem(stored)) {
      continue;
    }
    if (seenCustomIds.has(id)) {
      continue;
    }
    seenCustomIds.add(id);

    const normalized = normalizeReferenceItems([
      {
        id: stored.id,
        label: stored.label,
        category: stored.category,
        checked: stored.checked,
        isCustom: true,
      },
    ])[0];

    customItems.push({
      ...normalized,
      isCustom: true,
    });
  }

  return [...mergedReference, ...customItems];
}

export function groupChecklistItemsByCategory(items) {
  const map = new Map();

  for (const item of items) {
    const category = item.category;

    if (!map.has(category)) {
      map.set(category, { category, items: [] });
    }

    map.get(category).items.push(item);
  }

  return Array.from(map.values());
}

export function getInitialExpandedGroups(groups, focusedItemId) {
  const expandedMap = {};

  groups.forEach((group) => {
    const hasFocusedItem = group.items.some((item) => item.id === focusedItemId);
    expandedMap[group.category] = hasFocusedItem;
  });

  return expandedMap;
}

export function mergeExpandedGroups(prev, groupedItems, focusedItemId) {
  let nextState;

  if (Object.keys(prev).length > 0) {
    nextState = { ...prev };

    groupedItems.forEach((group) => {
      if (typeof nextState[group.category] !== "boolean") {
        const hasFocusedItem = group.items.some(
          (item) => item.id === focusedItemId
        );
        nextState[group.category] = hasFocusedItem;
      }
    });
  } else {
    nextState = getInitialExpandedGroups(groupedItems, focusedItemId);
  }

  if (focusedItemId) {
    const focusedGroup = groupedItems.find((group) =>
      group.items.some((item) => item.id === focusedItemId)
    );

    if (focusedGroup) {
      nextState = {
        ...nextState,
        [focusedGroup.category]: true,
      };
    }
  }

  return nextState;
}

export function buildGroupedItemsSignature(groupedItems) {
  return groupedItems
    .map((group) =>
      group.items.map((item) => `${item.id}:${item.checked ? 1 : 0}`).join(",")
    )
    .join("|");
}
