import { useState } from "react";
import { readStorage, writeStorage } from "../utils/storage";

const STORAGE_KEY = "completedPregnancyTasks";

function getSafeCompletedTasks(value) {
  return Array.isArray(value)
    ? value.filter((item) => typeof item === "string")
    : [];
}

export function useCompletedTasks() {
  const [completedTasks, setCompletedTasks] = useState(() =>
    getSafeCompletedTasks(readStorage(STORAGE_KEY, []))
  );

  function isTaskCompleted(taskId) {
    return completedTasks.includes(taskId);
  }

  function completeTask(taskId) {
    if (typeof taskId !== "string" || !taskId.trim()) {
      return;
    }

    if (completedTasks.includes(taskId)) {
      return;
    }

    const updatedTasks = [...completedTasks, taskId];
    setCompletedTasks(updatedTasks);
    writeStorage(STORAGE_KEY, updatedTasks);
  }

  function uncompleteTask(taskId) {
    if (typeof taskId !== "string" || !taskId.trim()) {
      return;
    }

    const updatedTasks = completedTasks.filter((id) => id !== taskId);
    setCompletedTasks(updatedTasks);
    writeStorage(STORAGE_KEY, updatedTasks);
  }

  function clearCompletedTasks() {
    setCompletedTasks([]);
    writeStorage(STORAGE_KEY, []);
  }

  return {
    completedTasks,
    isTaskCompleted,
    completeTask,
    uncompleteTask,
    clearCompletedTasks,
  };
}