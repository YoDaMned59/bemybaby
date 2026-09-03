import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Ga4Pageview from "../components/Ga4Pageview";
import PwaInstallListeners from "../components/PwaInstallListeners";
import DashboardPage from "../features/dashboard/DashboardPage";
import ListsPage from "../features/lists/ListsPage";
import ListDetailPage from "../features/lists/ListDetailPage";
import ProfilePage from "../features/profile/ProfilePage";
import PrivacyPage from "../features/privacy/PrivacyPage";
import RendezVousPage from "../features/rdv/RendezVousPage";
import { trackReturningUserSession } from "../utils/funnelAnalytics";

/**
 * Routes applicatives (après auth ready).
 * Charte + pages : wrappers features → anciens modules pendant la migration.
 */
export default function AppRoutes() {
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
