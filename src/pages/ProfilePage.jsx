import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [profile, setProfile] = useLocalStorage("bmb-profile", {
    name: "",
    dueDate: "",
  });

  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    setProfile(form);
    setSaved(true);

    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="profile-page">
      <h1>Mon profil</h1>

      <div className="card profile-card">
        <label>
          Prénom
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ex : Sarah"
          />
        </label>

        <label>
          Date prévue d’accouchement
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />
        </label>

        <button onClick={handleSave} className="save-btn">
          Enregistrer
        </button>

        {saved && <p className="success">Profil enregistré ✅</p>}
      </div>
    </div>
  );
}