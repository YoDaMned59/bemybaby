import { readStorage } from "./storage";

export const RDV_STORAGE_KEY = "beMyBabyRdvV1";

/**
 * @param {unknown} value
 * @returns {import('../hooks/useAppointments').Appointment[]}
 */
export function normalizeAppointments(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .filter(
      (a) =>
        a &&
        typeof a === "object" &&
        typeof a.id === "string" &&
        typeof a.title === "string" &&
        typeof a.date === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(a.date)
    )
    .map((a) => ({
      id: a.id,
      title: a.title.trim() || "Rendez-vous",
      date: a.date,
      note: typeof a.note === "string" ? a.note : "",
      completed: a.completed === true,
      sourceTemplateId:
        typeof a.sourceTemplateId === "string" ? a.sourceTemplateId : undefined,
    }));
}

/**
 * @returns {import('../hooks/useAppointments').Appointment[]}
 */
export function getStoredAppointments() {
  return normalizeAppointments(readStorage(RDV_STORAGE_KEY, []));
}

export function newAppointmentId() {
  return `rdv-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * @param {import('../hooks/useAppointments').Appointment[]} appointments
 */
export function sortAppointmentsByDate(appointments) {
  return [...appointments].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return a.date.localeCompare(b.date);
  });
}

/**
 * @param {import('../hooks/useAppointments').Appointment[]} appointments
 */
export function getRdvProgressPercent(appointments) {
  if (appointments.length === 0) {
    return 0;
  }
  const done = appointments.filter((a) => a.completed).length;
  return Math.round((done / appointments.length) * 100);
}

/**
 * Prochain rendez-vous non coché (le plus tôt en date).
 * @param {import('../hooks/useAppointments').Appointment[]} appointments
 */
export function getNextRdv(appointments) {
  const open = appointments.filter((a) => !a.completed);
  if (open.length === 0) {
    return null;
  }
  return [...open].sort((a, b) => a.date.localeCompare(b.date))[0] ?? null;
}
