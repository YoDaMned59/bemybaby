import { readStorage } from "./storage";

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
  }));
}

export function getInitialChecklistItems(storageKey, fallbackData) {
  const referenceItems = normalizeReferenceItems(fallbackData);
  const storedItems = readStorage(storageKey, []);

  if (!Array.isArray(storedItems) || storedItems.length === 0) {
    return referenceItems;
  }

  const storedCheckedMap = new Map(
    storedItems
      .filter((item) => item && typeof item === "object")
      .map((item) => [String(item.id), item.checked === true])
  );

  return referenceItems.map((item) => ({
    ...item,
    checked: storedCheckedMap.has(item.id)
      ? storedCheckedMap.get(item.id)
      : item.checked,
  }));
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
