export default function DashboardBabySection({ currentWeek, development }) {
  return (
    <section className="dashboard-section dashboard-baby-development">
      <div className="dashboard-section-header">
        <h2>Développement de bébé</h2>
        <span className="dashboard-pill">Semaine {currentWeek}</span>
      </div>

      <div className="dashboard-baby-visual">
        <img
          src={development.image}
          alt="Illustration du développement du bébé"
          className="dashboard-main-image"
          decoding="async"
          fetchPriority="high"
        />

        <img
          src={development.fruitImage}
          alt={`Comparaison de taille : ${development.sizeLabel}`}
          className="dashboard-main-image"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      </div>

      <div className="dashboard-baby-card">
        <h3>{development.title}</h3>
        <p>{development.description}</p>
      </div>
    </section>
  );
}
