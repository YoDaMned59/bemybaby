import { readStorage } from "../utils/storage";
import { calculatePregnancyWeek, formatDueDate } from "../utils/pregnancy";
import { EMPTY_PROFILE, normalizeProfileInput } from "../utils/profileModel";

export function useProfile() {
  const storedProfile = readStorage("profile", EMPTY_PROFILE);
  const profile = normalizeProfileInput(storedProfile);

  const firstName = profile.firstName.trim() || "toi";
  const hasDueDate = Boolean(profile.dueDate);
  const currentWeek = hasDueDate ? calculatePregnancyWeek(profile.dueDate) : 0;
  const formattedDueDate = hasDueDate ? formatDueDate(profile.dueDate) : "-";

  return {
    firstName,
    dueDate: profile.dueDate,
    formattedDueDate,
    currentWeek,
    hasDueDate,
    age: profile.age,
    pregnancyType: profile.pregnancyType,
    isProfileComplete: Boolean(profile.firstName.trim() && profile.dueDate),
  };
}
