import { babyDevelopment } from "../data/babyDevelopment";

function getDevelopmentForWeek(currentWeek) {
  if (typeof currentWeek !== "number" || currentWeek <= 0) {
    return null;
  }

  return (
    babyDevelopment.find(
      (item) => currentWeek >= item.startWeek && currentWeek <= item.endWeek
    ) || null
  );
}

export function useBabyDevelopment(currentWeek) {
  const development = getDevelopmentForWeek(currentWeek);

  return {
    development,
  };
}