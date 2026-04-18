import { useState } from "react";
import { readStorage, writeStorage } from "../utils/storage";
import { EMPTY_PROFILE, normalizeProfileInput } from "../utils/profileModel";

export function useProfileForm() {
  const [profile, setProfile] = useState(() =>
    normalizeProfileInput(readStorage("profile", EMPTY_PROFILE))
  );
  const [saved, setSaved] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
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
