import { signal, computed, effect } from "@preact/signals-react";
import { Exercise, LOCAL_STORAGE_EXERCISE_KEY } from "./types";

export const getExercisesFromLS = (): Exercise[] => {
  const exercises = localStorage.getItem(LOCAL_STORAGE_EXERCISE_KEY);
  if (exercises == null) return [];
  // date objects cannot be serialized so recreating each object
  return JSON.parse(exercises).map((ex: Exercise) => ({
    name: ex.name,
    sets: ex.sets,
    date: new Date(ex.date),
  }));
};

export const exercises = signal<Exercise[]>(getExercisesFromLS());

export const exerciseNames = computed(() => {
  const names = new Set<string>();

  for (const exercise of exercises.value) {
    names.add(exercise.name);
  }

  return Array.from(names);
});

effect(() => {
  localStorage.setItem(
    LOCAL_STORAGE_EXERCISE_KEY,
    JSON.stringify(exercises.value)
  );
});
