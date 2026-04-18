import BottomNav from "../BottomNav";

export default function AppPage({ pageClassName, containerClassName, children }) {
  return (
    <div className={pageClassName}>
      <div className={containerClassName}>{children}</div>
      <BottomNav />
    </div>
  );
}
