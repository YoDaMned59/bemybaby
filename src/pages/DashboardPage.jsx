import AppPage from "../components/page/AppPage";
import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardOnboarding from "../components/dashboard/DashboardOnboarding";
import DashboardInfoCards from "../components/dashboard/DashboardInfoCards";
import DashboardBabySection from "../components/dashboard/DashboardBabySection";
import DashboardProgressSection from "../components/dashboard/DashboardProgressSection";
import DashboardTasksSection from "../components/dashboard/DashboardTasksSection";
import DashboardDailyTip from "../components/dashboard/DashboardDailyTip";
import DashboardPwaInstall from "../components/dashboard/DashboardPwaInstall";
import { getTodayTasks } from "../utils/todayTasks";
import { useProfile } from "../hooks/useProfile";
import { useProgress } from "../hooks/useProgress";
import { useCompletedTasks } from "../hooks/useCompletedTasks";
import { useBabyDevelopment } from "../hooks/useBabyDevelopment";
import "./DashboardPage.scss";

export default function DashboardPage() {
  const {
    firstName,
    formattedDueDate,
    currentWeek,
    hasDueDate,
    isProfileComplete,
  } = useProfile();

  const {
    babyProgress,
    maternityBagProgress,
    adminProgress,
    overallProgress,
  } = useProgress();

  const { completedTasks, completeTask } = useCompletedTasks();
  const { development } = useBabyDevelopment(currentWeek);

  const todayTasks = hasDueDate
    ? getTodayTasks(currentWeek, completedTasks)
    : [];

  return (
    <AppPage pageClassName="dashboard-page" containerClassName="dashboard-container">
      <DashboardHero firstName={firstName} />

      <DashboardPwaInstall />

      {!isProfileComplete ? <DashboardOnboarding /> : null}

      <DashboardInfoCards
        hasDueDate={hasDueDate}
        currentWeek={currentWeek}
        formattedDueDate={formattedDueDate}
      />

      {hasDueDate && development ? (
        <DashboardBabySection
          currentWeek={currentWeek}
          development={development}
        />
      ) : null}

      <DashboardProgressSection
        overallProgress={overallProgress}
        babyProgress={babyProgress}
        maternityBagProgress={maternityBagProgress}
        adminProgress={adminProgress}
      />

      <DashboardTasksSection
        hasDueDate={hasDueDate}
        currentWeek={currentWeek}
        todayTasks={todayTasks}
        onCompleteTask={completeTask}
      />

      <DashboardDailyTip />
    </AppPage>
  );
}
