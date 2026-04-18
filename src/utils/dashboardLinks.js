export function getDashboardTaskLink(task) {
  if (!task.linkTo) {
    return null;
  }

  return task.focusItemId
    ? `${task.linkTo}?focus=${task.focusItemId}`
    : task.linkTo;
}
