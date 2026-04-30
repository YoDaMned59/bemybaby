import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Ga4Pageview from "./components/Ga4Pageview";
import PwaInstallListeners from "./components/PwaInstallListeners";
import DashboardPage from "./pages/DashboardPage";
import ListsPage from "./pages/ListsPage";
import ListDetailPage from "./pages/ListDetailPage";
import ProfilePage from "./pages/ProfilePage";
import PrivacyPage from "./pages/PrivacyPage";
import RendezVousPage from "./pages/RendezVousPage";
import { trackReturningUserSession } from "./utils/funnelAnalytics";

export default function App() {
  useEffect(() => {
    trackReturningUserSession();
  }, []);

  return (
    <>
      <Ga4Pageview />
      <PwaInstallListeners />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/rdv" element={<RendezVousPage />} />
        <Route path="/lists" element={<ListsPage />} />
        <Route path="/lists/:listId" element={<ListDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/confidentialite" element={<PrivacyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}