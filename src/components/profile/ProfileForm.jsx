export default function ProfileForm({
  profile,
  saved,
  onChange,
  onSubmit,
}) {
  return (
    <form className="profile-form" onSubmit={onSubmit}>
      <div className="profile-field">
        <label htmlFor="firstName">Prénom</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Ton prénom"
          value={profile.firstName}
          onChange={onChange}
          autoComplete="given-name"
        />
      </div>

      <div className="profile-field">
        <label htmlFor="dueDate">Date prévue d'accouchement</label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          value={profile.dueDate}
          onChange={onChange}
        />
      </div>

      <button type="submit" className="profile-save-button">
        Enregistrer
      </button>

      {saved ? (
        <p className="profile-saved-message">Profil enregistré avec succès</p>
      ) : null}
    </form>
  );
}
