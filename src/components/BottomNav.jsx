import { NavLink } from "react-router-dom";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/">Accueil</NavLink>
      <NavLink to="/listes">Listes</NavLink>
      <NavLink to="/profil">Profil</NavLink>
    </nav>
  );
}