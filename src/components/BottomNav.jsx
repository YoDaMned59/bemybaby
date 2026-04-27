import { NavLink } from "react-router-dom";
import { CalendarClock, Home, ListChecks, User } from "lucide-react";
import "./BottomNav.scss";

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navigation principale">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `bottom-nav-link ${isActive ? "active" : ""}`
        }
      >
        <Home />
        <span>Accueil</span>
      </NavLink>

      <NavLink
        to="/lists"
        className={({ isActive }) =>
          `bottom-nav-link ${isActive ? "active" : ""}`
        }
      >
        <ListChecks />
        <span>Listes</span>
      </NavLink>

      <NavLink
        to="/rdv"
        className={({ isActive }) =>
          `bottom-nav-link ${isActive ? "active" : ""}`
        }
      >
        <CalendarClock />
        <span>RDV</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `bottom-nav-link ${isActive ? "active" : ""}`
        }
      >
        <User />
        <span>Profil</span>
      </NavLink>
    </nav>
  );
}