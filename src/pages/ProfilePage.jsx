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
        subtitle="Tes infos servent à personnaliser les listes et rappels — tout reste sur cet appareil pour l’instant."
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
