import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PostHogPageview from "./components/PostHogPageview";
import DashboardPage from "./pages/DashboardPage";
import ListsPage from "./pages/ListsPage";
import ListDetailPage from "./pages/ListDetailPage";
import ProfilePage from "./pages/ProfilePage";
import PrivacyPage from "./pages/PrivacyPage";

export default function App() {
  return (
    <BrowserRouter>
      <PostHogPageview />
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