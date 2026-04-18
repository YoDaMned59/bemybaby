export default function DashboardHero({ firstName }) {
  return (
    <section className="dashboard-hero">
      <span className="dashboard-brand">BEMYBABY</span>
      <h1>Bonjour {firstName} 👋</h1>
      <p>
        Tes <strong>listes</strong> et tes <strong>« déjà fait »</strong> au même
        endroit sur le téléphone — sans jongler entre Excel, notes et plusieurs
        applis.
      </p>
    </section>
  );
}
