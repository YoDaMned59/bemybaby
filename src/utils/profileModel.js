export const EMPTY_PROFILE = {
  firstName: "",
  dueDate: "",
  age: "",
  pregnancyType: "",
};

export function normalizeProfileInput(value) {
  if (!value || typeof value !== "object") {
    return { ...EMPTY_PROFILE };
  }

  return {
    firstName:
      typeof value.firstName === "string" ? value.firstName : "",
    dueDate: typeof value.dueDate === "string" ? value.dueDate : "",
    age:
      typeof value.age === "string" || typeof value.age === "number"
        ? String(value.age)
        : "",
    pregnancyType:
      typeof value.pregnancyType === "string" ? value.pregnancyType : "",
  };
}
