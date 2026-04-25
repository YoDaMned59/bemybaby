import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AppPage from "../components/page/AppPage";
import StackedPageHeader from "../components/page/StackedPageHeader";
import ListDetailNotFound from "../components/list-detail/ListDetailNotFound";
import ProfileListsGate from "../components/lists/ProfileListsGate";
import ListDetailPageContent from "./ListDetailPageContent";
import { getChecklistById } from "../data/checklistsConfig";
import { useProfile } from "../hooks/useProfile";
import { trackAppEvent } from "../utils/appAnalytics";
import "./ListDetailPage.scss";

export default function ListDetailPage() {
  const navigate = useNavigate();
  const { listId } = useParams();
  const location = useLocation();
  const { isProfileComplete } = useProfile();
  const listConfig = getChecklistById(listId);

  useEffect(() => {
    if (!listConfig || isProfileComplete) {
      return;
    }
    trackAppEvent("list_profile_gate", { list_id: listConfig.id });
  }, [listConfig, isProfileComplete, listId]);

  if (!listConfig) {
    return <ListDetailNotFound onBack={() => navigate(-1)} />;
  }

  if (!isProfileComplete) {
    return (
      <AppPage pageClassName="list-detail-page" containerClassName="list-detail-container">
        <StackedPageHeader
          sectionClassName="list-detail-header"
          onBack={() => navigate(-1)}
          title={listConfig.title}
          subtitle="Indique ton prénom et ta date prévue dans Profil pour débloquer cette liste."
        />

        <ProfileListsGate listTitle={listConfig.title} />
      </AppPage>
    );
  }

  return (
    <AppPage pageClassName="list-detail-page" containerClassName="list-detail-container">
      <ListDetailPageContent listId={listId} locationSearch={location.search} />
    </AppPage>
  );
}
