import { useEffect } from "react";
import AppPage from "../components/page/AppPage";
import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardNextStep from "../components/dashboard/DashboardNextStep";
import DashboardListQuickAccess from "../components/dashboard/DashboardListQuickAccess";
import DashboardAuthTeaser from "../components/dashboard/DashboardAuthTeaser";
import DashboardProfileTeaser from "../components/dashboard/DashboardProfileTeaser";
import { getProgressHeadline } from "../components/dashboard/dashboardGuidance";
import DashboardInfoCards from "../components/dashboard/DashboardInfoCards";
import DashboardBabySection from "../components/dashboard/DashboardBabySection";
import DashboardProgressSection from "../components/dashboard/DashboardProgressSection";
import DashboardTasksSection from "../components/dashboard/DashboardTasksSection";
import DashboardDailyTip from "../components/dashboard/DashboardDailyTip";
import DashboardRdvTeaser from "../components/dashboard/DashboardRdvTeaser";
import { trackLandingViewIfFirstThisSession } from "../utils/funnelAnalytics";
import { getTodayTasks } from "../utils/todayTasks";
import { useProfile } from "../hooks/useProfile";
import { useProgress } from "../hooks/useProgress";
import { useCompletedTasks } from "../hooks/useCompletedTasks";
import { useBabyDevelopment } from "../hooks/useBabyDevelopment";
import { useAppointments } from "../hooks/useAppointments";
import "./DashboardPage.scss";

export default function DashboardPage() {
  useEffect(() => {
    trackLandingViewIfFirstThisSession();
  }, []);

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
  const { appointments } = useAppointments();

  const todayTasks = hasDueDate
    ? getTodayTasks(currentWeek, completedTasks)
    : [];

  const appointmentCount = appointments.length;
  const progressHeadline = getProgressHeadline(overallProgress);

  return (
    <AppPage pageClassName="dashboard-page" containerClassName="dashboard-container">
      <DashboardHero
        firstName={firstName}
        isProfileComplete={isProfileComplete}
        babyProgress={babyProgress}
        appointmentsCount={appointmentCount}
      />

      <DashboardNextStep
        isProfileComplete={isProfileComplete}
        babyProgress={babyProgress}
        appointmentsCount={appointmentCount}
      />

      {!isProfileComplete ? <DashboardProfileTeaser /> : null}

      <DashboardListQuickAccess />

      <DashboardAuthTeaser />

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

      <DashboardRdvTeaser />

      <DashboardProgressSection
        overallProgress={overallProgress}
        babyProgress={babyProgress}
        maternityBagProgress={maternityBagProgress}
        adminProgress={adminProgress}
        progressHeadline={progressHeadline}
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
