import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StackedPageHeader from "../components/page/StackedPageHeader";
import ChecklistProgressCard from "../components/list-detail/ChecklistProgressCard";
import ChecklistCategoryGroups from "../components/list-detail/ChecklistCategoryGroups";
import { useChecklistDetail } from "../hooks/useChecklistDetail";
import { trackAppEvent } from "../utils/appAnalytics";

export default function ListDetailPageContent({ listId, locationSearch }) {
  const navigate = useNavigate();
  const {
    listConfig,
    progress,
    groupedItems,
    expandedGroups,
    focusedItemId,
    itemRefs,
    handleToggleItem,
    handleAddCustomItem,
    handleRemoveCustomItem,
    toggleGroup,
  } = useChecklistDetail(listId, locationSearch);

  useEffect(() => {
    if (!listConfig) {
      return;
    }
    trackAppEvent("list_checklist_open", { list_id: listConfig.id });
  }, [listConfig]);

  if (!listConfig) {
    return null;
  }

  return (
    <>
      <StackedPageHeader
        sectionClassName="list-detail-header"
        onBack={() => navigate(-1)}
        title={listConfig.title}
        subtitle="Avance à ton rythme et coche chaque étape au fur et à mesure."
      />

      <ChecklistProgressCard progress={progress} />

      <ChecklistCategoryGroups
        groupedItems={groupedItems}
        expandedGroups={expandedGroups}
        focusedItemId={focusedItemId}
        itemRefs={itemRefs}
        onToggleGroup={toggleGroup}
        onToggleItem={handleToggleItem}
        onAddCustomItem={handleAddCustomItem}
        onRemoveCustomItem={handleRemoveCustomItem}
      />
    </>
  );
}
