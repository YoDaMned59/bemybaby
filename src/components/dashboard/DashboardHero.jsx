export default function DashboardHero({ firstName }) {
  return (
    <section className="dashboard-hero">
      <span className="dashboard-brand">BEMYBABY</span>
      <h1>Bonjour {firstName} 👋</h1>
      <p>
        Ton assistant simple pour préparer l’arrivée de bébé sans rien
        oublier.
      </p>
    </section>
  );
}
