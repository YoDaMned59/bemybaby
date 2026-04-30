import { useEffect, useMemo, useRef, useState } from "react";
import { getChecklistById } from "../data/checklistsConfig";
import { getChecklistProgressPercent } from "../utils/checklistProgress";
import {
  buildGroupedItemsSignature,
  getInitialChecklistItems,
  groupChecklistItemsByCategory,
  mergeExpandedGroups,
} from "../utils/checklistItems";
import { trackAppEvent } from "../utils/appAnalytics";
import { ENGAGED_MARKER_PREFIX } from "../utils/funnelAnalytics";
import { readStorage, writeStorage } from "../utils/storage";

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

  function persist(nextItems) {
    if (!listConfig) {
      return;
    }

    setItems(nextItems);
    writeStorage(listConfig.storageKey, nextItems);
  }

  function handleToggleItem(itemId) {
    if (!listConfig) {
      return;
    }

    const prevProgress = getChecklistProgressPercent(items);
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    const nextProgress = getChecklistProgressPercent(updatedItems);

    if (prevProgress === 0 && nextProgress > 0) {
      const markerKey = `${ENGAGED_MARKER_PREFIX}${listConfig.storageKey}`;
      if (readStorage(markerKey, false) !== true) {
        writeStorage(markerKey, true);
        trackAppEvent("list_created", { list_id: listConfig.id });
      }
    }

    persist(updatedItems);

    const milestones = [25, 50, 75, 100];
    for (const m of milestones) {
      if (prevProgress < m && nextProgress >= m) {
        trackAppEvent("checklist_milestone", {
          list_id: listConfig.id,
          milestone: m,
        });
        break;
      }
    }
  }

  function handleAddCustomItem(category, label) {
    if (!listConfig) {
      return;
    }

    const trimmed = typeof label === "string" ? label.trim() : "";
    if (!trimmed) {
      return;
    }

    const newItem = {
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      label: trimmed,
      category,
      checked: false,
      isCustom: true,
    };

    persist([...items, newItem]);
    trackAppEvent("checklist_custom_item_added", {
      list_id: listConfig.id,
    });
  }

  function handleRemoveCustomItem(itemId) {
    if (!listConfig) {
      return;
    }

    persist(items.filter((item) => item.id !== itemId));
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
    handleAddCustomItem,
    handleRemoveCustomItem,
    toggleGroup,
  };
}
