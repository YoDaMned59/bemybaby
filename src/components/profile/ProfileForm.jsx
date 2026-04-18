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

      <div className="profile-field">
        <label htmlFor="age">Âge</label>
        <input
          id="age"
          name="age"
          type="text"
          inputMode="numeric"
          placeholder="Ex : 28"
          value={profile.age}
          onChange={onChange}
        />
      </div>

      <fieldset className="profile-fieldset">
        <legend>Type de grossesse</legend>

        <label className="profile-radio">
          <input
            type="radio"
            name="pregnancyType"
            value="spontaneous"
            checked={profile.pregnancyType === "spontaneous"}
            onChange={onChange}
          />
          <span>Spontanée</span>
        </label>

        <label className="profile-radio">
          <input
            type="radio"
            name="pregnancyType"
            value="pma"
            checked={profile.pregnancyType === "pma"}
            onChange={onChange}
          />
          <span>PMA</span>
        </label>

        <label className="profile-radio">
          <input
            type="radio"
            name="pregnancyType"
            value="prefer_not_to_say"
            checked={profile.pregnancyType === "prefer_not_to_say"}
            onChange={onChange}
          />
          <span>Je ne souhaite pas répondre</span>
        </label>
      </fieldset>

      <button type="submit" className="profile-save-button">
        Enregistrer
      </button>

      {saved ? (
        <p className="profile-saved-message">Profil enregistré avec succès</p>
      ) : null}
    </form>
  );
}
