import { useNavigate } from "react-router-dom";
import AppPage from "../components/page/AppPage";
import StackedPageHeader from "../components/page/StackedPageHeader";
import ChecklistSummaryGrid from "../components/lists/ChecklistSummaryGrid";
import { useProgress } from "../hooks/useProgress";
import { CHECKLIST_IDS, CHECKLISTS } from "../data/checklistsConfig";
import "./ListsPage.scss";

export default function ListsPage() {
  const navigate = useNavigate();
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
        subtitle="Toutes tes listes (bébé, valise, prénoms, démarches) au même endroit. Les rendez-vous médicaux : onglet Rendez-vous."
      />

      <ChecklistSummaryGrid lists={lists} />
    </AppPage>
  );
}
