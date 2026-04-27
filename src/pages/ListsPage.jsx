import { useNavigate } from "react-router-dom";
import AppPage from "../components/page/AppPage";
import StackedPageHeader from "../components/page/StackedPageHeader";
import ChecklistSummaryGrid from "../components/lists/ChecklistSummaryGrid";
import ProfileListsGate from "../components/lists/ProfileListsGate";
import { useProgress } from "../hooks/useProgress";
import { useProfile } from "../hooks/useProfile";
import { CHECKLIST_IDS, CHECKLISTS } from "../data/checklistsConfig";
import "./ListsPage.scss";

export default function ListsPage() {
  const navigate = useNavigate();
  const { isProfileComplete } = useProfile();
  const { progressById } = useProgress();

  const lists = CHECKLIST_IDS.map((id) => {
    const config = CHECKLISTS[id];

    return {
      id: config.id,
      title: config.title,
      description: config.description,
      progress: progressById[id],
      path: `/lists/${config.id}`,
    };
  });

  return (
    <AppPage pageClassName="lists-page" containerClassName="lists-container">
      <StackedPageHeader
        sectionClassName="lists-header"
        onBack={() => navigate(-1)}
        brandClassName="lists-brand"
        title="Mes listes"
        subtitle="Listes de préparation (bébé, valise, prénoms…). Les rendez-vous médicaux sont sur l’onglet Rendez-vous."
      />

      {isProfileComplete ? (
        <ChecklistSummaryGrid lists={lists} />
      ) : (
        <ProfileListsGate />
      )}
    </AppPage>
  );
}
