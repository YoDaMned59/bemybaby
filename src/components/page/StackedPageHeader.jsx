import PageBackButton from "./PageBackButton";

export default function StackedPageHeader({
  sectionClassName,
  onBack,
  brandClassName,
  title,
  subtitle,
}) {
  return (
    <section className={sectionClassName}>
      {onBack ? <PageBackButton onClick={onBack} /> : null}
      {brandClassName ? (
        <span className={brandClassName}>BEMYBABY</span>
      ) : null}
      <h1>{title}</h1>
      {subtitle ? <p>{subtitle}</p> : null}
    </section>
  );
}
