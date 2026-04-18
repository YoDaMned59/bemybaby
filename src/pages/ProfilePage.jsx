import { useNavigate } from "react-router-dom";
import AppPage from "../components/page/AppPage";
import StackedPageHeader from "../components/page/StackedPageHeader";
import ProfileForm from "../components/profile/ProfileForm";
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
        subtitle="Renseigne tes informations pour personnaliser ton accompagnement."
      />

      <ProfileForm
        profile={profile}
        saved={saved}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </AppPage>
  );
}
