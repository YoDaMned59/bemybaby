export function getPregnancyWeek(dueDate) {
    if (!dueDate) return null;
  
    const due = new Date(dueDate);
    const now = new Date();
  
    const diff = due - now;
    const days = diff / (1000 * 60 * 60 * 24);
  
    const totalDays = 280;
    const current = totalDays - days;
  
    return Math.floor(current / 7);
  }