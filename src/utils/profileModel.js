export const EMPTY_PROFILE = {
  firstName: "",
  dueDate: "",
};

export function normalizeProfileInput(value) {
  if (!value || typeof value !== "object") {
    return { ...EMPTY_PROFILE };
  }

  return {
    firstName:
      typeof value.firstName === "string" ? value.firstName : "",
    dueDate: typeof value.dueDate === "string" ? value.dueDate : "",
  };
}
