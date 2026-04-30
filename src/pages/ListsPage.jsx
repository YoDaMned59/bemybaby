import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppPage from "../components/page/AppPage";
import StackedPageHeader from "../components/page/StackedPageHeader";
import ChecklistSummaryGrid from "../components/lists/ChecklistSummaryGrid";
import { useProgress } from "../hooks/useProgress";
import { CHECKLIST_IDS, CHECKLISTS } from "../data/checklistsConfig";
import { trackAppEvent } from "../utils/appAnalytics";
import "./ListsPage.scss";

export default function ListsPage() {
  useEffect(() => {
    trackAppEvent("lists_viewed", {});
  }, []);

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

  const ongoing = lists.filter((l) => l.progress > 0 && l.progress < 100);
  let featuredListId = null;
  if (ongoing.length > 0) {
    featuredListId = ongoing.reduce((best, cur) =>
      cur.progress > best.progress ? cur : best
    ).id;
  } else {
    const baby = lists.find((l) => l.id === "baby");
    if (baby && baby.progress === 0) {
      featuredListId = "baby";
    }
  }

  return (
    <AppPage pageClassName="lists-page" containerClassName="lists-container">
      <StackedPageHeader
        sectionClassName="lists-header"
        onBack={() => navigate(-1)}
        brandClassName="lists-brand"
        title="Mes listes"
        subtitle="Ouvre une liste et coche au fur et à mesure — tout reste dans l’app. Les RDV médicaux : onglet en bas à droite."
      />

      <ChecklistSummaryGrid lists={lists} featuredListId={featuredListId} />
    </AppPage>
  );
}
