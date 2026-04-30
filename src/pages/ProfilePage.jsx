import { Link, useNavigate } from "react-router-dom";
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
        subtitle="Pour le MVP, seuls le prénom et la date prévue sont demandés : ils servent aux rappels et à l’affichage de ta grossesse. Tout reste sur cet appareil."
      />

      <ProfileForm
        profile={profile}
        saved={saved}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <p className="profile-footer-privacy-link">
        <Link to="/confidentialite">Confidentialité et mesure d’audience</Link>
      </p>
    </AppPage>
  );
}
