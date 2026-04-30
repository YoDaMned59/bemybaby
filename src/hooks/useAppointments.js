import { useCallback, useState } from "react";
import { writeStorage } from "../utils/storage";
import {
  getStoredAppointments,
  newAppointmentId,
  RDV_STORAGE_KEY,
  sortAppointmentsByDate,
} from "../utils/appointmentsModel";
import { trackAppEvent } from "../utils/appAnalytics";

/**
 * @typedef {Object} Appointment
 * @property {string} id
 * @property {string} title
 * @property {string} date YYYY-MM-DD
 * @property {string} [note]
 * @property {boolean} completed
 * @property {string} [sourceTemplateId]
 */

function todayIso() {
  const t = new Date();
  const y = t.getFullYear();
  const m = String(t.getMonth() + 1).padStart(2, "0");
  const d = String(t.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function persistList(next) {
  writeStorage(RDV_STORAGE_KEY, next);
}

export function useAppointments() {
  const [appointments, setAppointments] = useState(getStoredAppointments);

  const addFromTemplate = useCallback((templateId, title, date) => {
    const iso =
      typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : todayIso();
    setAppointments((prev) => {
      const appt = {
        id: newAppointmentId(),
        title: String(title).trim() || "Rendez-vous",
        date: iso,
        note: "",
        completed: false,
        sourceTemplateId: templateId,
      };
      const next = sortAppointmentsByDate([...prev, appt]);
      persistList(next);
      return next;
    });
    trackAppEvent("rdv_created", { from_template: true });
  }, []);

  const addCustom = useCallback((title, date) => {
    const trimmed = typeof title === "string" ? title.trim() : "";
    if (!trimmed) {
      return;
    }
    const iso =
      typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : todayIso();
    setAppointments((prev) => {
      const appt = {
        id: newAppointmentId(),
        title: trimmed,
        date: iso,
        note: "",
        completed: false,
      };
      const next = sortAppointmentsByDate([...prev, appt]);
      persistList(next);
      return next;
    });
    trackAppEvent("rdv_created", { from_template: false });
  }, []);

  const updateDate = useCallback((id, newDate) => {
    if (typeof newDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
      return;
    }
    setAppointments((prev) => {
      const next = sortAppointmentsByDate(
        prev.map((a) => (a.id === id ? { ...a, date: newDate } : a))
      );
      persistList(next);
      return next;
    });
  }, []);

  const toggleCompleted = useCallback((id) => {
    setAppointments((prev) => {
      const next = sortAppointmentsByDate(
        prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
      );
      persistList(next);
      return next;
    });
  }, []);

  const removeOne = useCallback((id) => {
    setAppointments((prev) => {
      const next = prev.filter((a) => a.id !== id);
      persistList(next);
      return next;
    });
    trackAppEvent("rdv_removed", {});
  }, []);

  return {
    appointments: sortAppointmentsByDate(appointments),
    addFromTemplate,
    addCustom,
    updateDate,
    toggleCompleted,
    removeOne,
  };
}
