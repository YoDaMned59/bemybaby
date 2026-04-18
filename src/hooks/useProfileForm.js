import { useState } from "react";
import { readStorage, writeStorage } from "../utils/storage";
import { EMPTY_PROFILE, normalizeProfileInput } from "../utils/profileModel";

function sanitizeAge(value) {
  const digitsOnly = String(value).replace(/\D/g, "");

  if (!digitsOnly) {
    return "";
  }

  return digitsOnly.slice(0, 2);
}

export function useProfileForm() {
  const [profile, setProfile] = useState(() =>
    normalizeProfileInput(readStorage("profile", EMPTY_PROFILE))
  );
  const [saved, setSaved] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setProfile((prev) => ({
      ...prev,
      [name]: name === "age" ? sanitizeAge(value) : value,
    }));

    if (saved) {
      setSaved(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const safeProfile = {
      firstName: profile.firstName.trim(),
      dueDate: profile.dueDate,
      age: sanitizeAge(profile.age),
      pregnancyType: profile.pregnancyType,
    };

    writeStorage("profile", safeProfile);
    setSaved(true);
  }

  return {
    profile,
    saved,
    handleChange,
    handleSubmit,
  };
}
