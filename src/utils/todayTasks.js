import { pregnancyTasks } from "../data/pregnancyTasks";

const priorityOrder = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

export function getTodayTasks(currentWeek, completedTasks = []) {
  if (typeof currentWeek !== "number" || currentWeek <= 0) {
    return [];
  }

  const safeCompletedTasks = Array.isArray(completedTasks)
    ? completedTasks.filter((item) => typeof item === "string")
    : [];

  return pregnancyTasks
    .filter((task) => {
      const isInCurrentWindow =
        currentWeek >= task.startWeek && currentWeek <= task.endWeek;

      const isCompleted = safeCompletedTasks.includes(task.id);

      return isInCurrentWindow && !isCompleted;
    })
    .sort((a, b) => {
      const priorityA = priorityOrder[a.priority] || 0;
      const priorityB = priorityOrder[b.priority] || 0;

      if (priorityB !== priorityA) {
        return priorityB - priorityA;
      }

      return a.endWeek - b.endWeek;
    })
    .slice(0, 3);
}

export function getUrgencyLabel(task, currentWeek) {
  if (!task || typeof currentWeek !== "number") {
    return "normal";
  }

  const weeksLeft = task.endWeek - currentWeek;

  if (weeksLeft <= 1) {
    return "urgent";
  }

  if (weeksLeft <= 3) {
    return "soon";
  }

  return "normal";
}

export function getUrgencyText(task, currentWeek) {
  const urgency = getUrgencyLabel(task, currentWeek);

  if (urgency === "urgent") {
    return "Urgent";
  }

  if (urgency === "soon") {
    return "À anticiper";
  }

  return "À faire";
}