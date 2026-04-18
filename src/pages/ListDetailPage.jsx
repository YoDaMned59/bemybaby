import { useLocation, useNavigate, useParams } from "react-router-dom";
import AppPage from "../components/page/AppPage";
import StackedPageHeader from "../components/page/StackedPageHeader";
import ChecklistProgressCard from "../components/list-detail/ChecklistProgressCard";
import ChecklistCategoryGroups from "../components/list-detail/ChecklistCategoryGroups";
import ListDetailNotFound from "../components/list-detail/ListDetailNotFound";
import { useChecklistDetail } from "../hooks/useChecklistDetail";
import "./ListDetailPage.scss";

export default function ListDetailPage() {
  const navigate = useNavigate();
  const { listId } = useParams();
  const location = useLocation();

  const {
    listConfig,
    progress,
    groupedItems,
    expandedGroups,
    focusedItemId,
    itemRefs,
    handleToggleItem,
    toggleGroup,
  } = useChecklistDetail(listId, location.search);

  if (!listConfig) {
    return <ListDetailNotFound onBack={() => navigate(-1)} />;
  }

  return (
    <AppPage pageClassName="list-detail-page" containerClassName="list-detail-container">
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
      />
    </AppPage>
  );
}
