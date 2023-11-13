import { signal, effect, computed } from "@preact/signals-react";
import { LOCAL_STORAGE_SELECTED_EXERCISE_KEY } from "./types";
import { exercises } from "./exercise";

const getSelectedExerciseFromLS = (): string[] | null => {
  const selected = localStorage.getItem(LOCAL_STORAGE_SELECTED_EXERCISE_KEY);
  if (!selected || selected == "") return null;
  return JSON.parse(selected) ?? [];
};

export const selectedExercisesNames = signal<string[] | null>(
  getSelectedExerciseFromLS(),
);

export const selectedExercises = computed(() => {
  if (selectedExercisesNames.value === null) {
    return [];
  }
  return exercises.value.filter(
    (exercise) => selectedExercisesNames.value?.includes(exercise.name),
  );
});

export const selectedSets = computed(() => {
  if (selectedExercises.value === null) {
    return [];
  }
  return selectedExercises.value.flatMap((exercise) => exercise.sets);
});

effect(() => {
  localStorage.setItem(
    LOCAL_STORAGE_SELECTED_EXERCISE_KEY,
    JSON.stringify(selectedExercisesNames.value) || "",
  );
});
