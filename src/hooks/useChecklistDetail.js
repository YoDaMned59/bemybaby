import { useEffect, useMemo, useRef, useState } from "react";
import { getChecklistById } from "../data/checklistsConfig";
import { getChecklistProgressPercent } from "../utils/checklistProgress";
import {
  buildGroupedItemsSignature,
  getInitialChecklistItems,
  groupChecklistItemsByCategory,
  mergeExpandedGroups,
} from "../utils/checklistItems";
import { writeStorage } from "../utils/storage";

export function useChecklistDetail(listId, locationSearch) {
  const listConfig = getChecklistById(listId);
  const itemRefs = useRef({});

  const [items, setItems] = useState(() =>
    listConfig ? getInitialChecklistItems(listConfig.storageKey, listConfig.data) : []
  );

  const [activeListStorageKey, setActiveListStorageKey] = useState(
    () => listConfig?.storageKey ?? null
  );

  if (listConfig) {
    if (activeListStorageKey !== listConfig.storageKey) {
      setActiveListStorageKey(listConfig.storageKey);
      setItems(getInitialChecklistItems(listConfig.storageKey, listConfig.data));
    }
  } else if (activeListStorageKey !== null) {
    setActiveListStorageKey(null);
    setItems([]);
  }

  const focusedItemId = useMemo(() => {
    const params = new URLSearchParams(locationSearch);
    return params.get("focus") || "";
  }, [locationSearch]);

  const progress = useMemo(
    () => getChecklistProgressPercent(items),
    [items]
  );

  const groupedItems = useMemo(
    () => groupChecklistItemsByCategory(items),
    [items]
  );

  const groupedSignature = useMemo(
    () => buildGroupedItemsSignature(groupedItems),
    [groupedItems]
  );

  const expansionSyncKey = `${listId ?? ""}|${focusedItemId}|${groupedSignature}`;

  const [expandedGroups, setExpandedGroups] = useState({});
  const [lastExpansionSyncKey, setLastExpansionSyncKey] = useState(null);

  if (lastExpansionSyncKey !== expansionSyncKey) {
    setLastExpansionSyncKey(expansionSyncKey);
    setExpandedGroups((prev) =>
      mergeExpandedGroups(prev, groupedItems, focusedItemId)
    );
  }

  useEffect(() => {
    if (!focusedItemId) {
      return;
    }

    const targetElement = itemRefs.current[focusedItemId];

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [focusedItemId, items, expandedGroups]);

  function handleToggleItem(itemId) {
    if (!listConfig) {
      return;
    }

    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );

    setItems(updatedItems);
    writeStorage(listConfig.storageKey, updatedItems);
  }

  function toggleGroup(category) {
    setExpandedGroups((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  }

  return {
    listConfig,
    items,
    progress,
    groupedItems,
    expandedGroups,
    focusedItemId,
    itemRefs,
    handleToggleItem,
    toggleGroup,
  };
}
