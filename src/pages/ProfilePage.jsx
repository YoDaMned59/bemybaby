import { Link, useNavigate } from "react-router-dom";
import AppPage from "../components/page/AppPage";
import StackedPageHeader from "../components/page/StackedPageHeader";
import ProfileValueBanner from "../components/profile/ProfileValueBanner";
import ProfileForm from "../components/profile/ProfileForm";
import ProfileEmailAuth from "../components/profile/ProfileEmailAuth";
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
      />

      <ProfileValueBanner />

      <ProfileForm
        profile={profile}
        saved={saved}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <ProfileEmailAuth />

      <p className="profile-footer-privacy-link">
        <Link to="/confidentialite">Confidentialité et mesure d’audience</Link>
      </p>
    </AppPage>
  );
}
