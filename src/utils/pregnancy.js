export function calculatePregnancyWeek(dueDateString) {
  if (!dueDateString || typeof dueDateString !== "string") {
    return 0;
  }

  const dueDate = new Date(dueDateString);

  if (Number.isNaN(dueDate.getTime())) {
    return 0;
  }

  const today = new Date();
  const pregnancyStartDate = new Date(dueDate);
  pregnancyStartDate.setDate(pregnancyStartDate.getDate() - 280);

  const diffInMs = today.getTime() - pregnancyStartDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const currentWeek = Math.floor(diffInDays / 7) + 1;

  if (currentWeek < 0) {
    return 0;
  }

  if (currentWeek > 40) {
    return 40;
  }

  return currentWeek;
}

export function formatDueDate(dueDateString) {
  if (!dueDateString || typeof dueDateString !== "string") {
    return "-";
  }

  const dueDate = new Date(dueDateString);

  if (Number.isNaN(dueDate.getTime())) {
    return "-";
  }

  return dueDate.toLocaleDateString("fr-FR");
}