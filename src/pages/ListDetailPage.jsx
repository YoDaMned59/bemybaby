import { useLocation, useNavigate, useParams } from "react-router-dom";
import AppPage from "../components/page/AppPage";
import ListDetailNotFound from "../components/list-detail/ListDetailNotFound";
import ListDetailPageContent from "./ListDetailPageContent";
import { getChecklistById } from "../data/checklistsConfig";
import "./ListDetailPage.scss";

export default function ListDetailPage() {
  const navigate = useNavigate();
  const { listId } = useParams();
  const location = useLocation();
  const listConfig = getChecklistById(listId);

  if (!listConfig) {
    return <ListDetailNotFound onBack={() => navigate(-1)} />;
  }

  return (
    <AppPage pageClassName="list-detail-page" containerClassName="list-detail-container">
      <ListDetailPageContent listId={listId} locationSearch={location.search} />
    </AppPage>
  );
}
