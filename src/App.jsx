import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Ga4Pageview from "./components/Ga4Pageview";
import DashboardPage from "./pages/DashboardPage";
import ListsPage from "./pages/ListsPage";
import ListDetailPage from "./pages/ListDetailPage";
import ProfilePage from "./pages/ProfilePage";
import PrivacyPage from "./pages/PrivacyPage";

export default function App() {
  return (
    <BrowserRouter>
      <Ga4Pageview />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/lists" element={<ListsPage />} />
        <Route path="/lists/:listId" element={<ListDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/confidentialite" element={<PrivacyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}