import { useNavigate } from "react-router-dom";
import AppPage from "../components/page/AppPage";
import StackedPageHeader from "../components/page/StackedPageHeader";
import ProfileForm from "../components/profile/ProfileForm";
import ProfileDocumentNotice from "../components/profile/ProfileDocumentNotice";
import ProfileBetaFeedback from "../components/profile/ProfileBetaFeedback";
import { useProfileForm } from "../hooks/useProfileForm";
import "./ProfilePage.scss";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { profile, saved, handleChange, handleSubmit } = useProfileForm();

  return (
    <AppPage pageClassName="profile-page" containerClassName="profile-container">
      <StackedPageHeader
        sectionClassName="profile-header"
        onBack={() => navigate(-1)}
        brandClassName="profile-brand"
        title="Mon profil"
        subtitle="Prénom et date prévue permettent d’adapter les rappels et l’affichage de ta grossesse. Tout est enregistré sur cet appareil pour le moment."
      />

      <ProfileForm
        profile={profile}
        saved={saved}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <ProfileDocumentNotice />

      <ProfileBetaFeedback />
    </AppPage>
  );
}
