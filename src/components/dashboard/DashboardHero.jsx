export default function DashboardHero({ firstName }) {
  return (
    <section className="dashboard-hero">
      <span className="dashboard-brand">BEMYBABY</span>
      <h1>Bonjour {firstName} 👋</h1>
      <p>
        Toutes tes <strong>listes</strong> et ce que tu as <strong>déjà fait</strong>{" "}
        sont réunis ici, sur ton téléphone — sans jongler entre un tableur, des notes
        et plusieurs applications.
      </p>
    </section>
  );
}
