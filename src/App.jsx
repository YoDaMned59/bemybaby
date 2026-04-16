import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ListsPage from "./pages/ListsPage";
import ListDetailPage from "./pages/ListDetailPage";
import ProfilePage from "./pages/ProfilePage";
import BottomNav from "./components/BottomNav";

export default function App() {
  return (
    <div className="app-shell">
      <div className="page-shell">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/listes" element={<ListsPage />} />
          <Route path="/listes/:listId" element={<ListDetailPage />} />
          <Route path="/profil" element={<ProfilePage />} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  );
}