import AppPage from "../page/AppPage";
import PageBackButton from "../page/PageBackButton";

export default function ListDetailNotFound({ onBack }) {
  return (
    <AppPage pageClassName="list-detail-page" containerClassName="list-detail-container">
      <section className="list-detail-card">
        <h1>Liste introuvable</h1>
        <p>Cette checklist n’existe pas.</p>
        <PageBackButton onClick={onBack} />
      </section>
    </AppPage>
  );
}
