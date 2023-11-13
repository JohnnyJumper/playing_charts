export type SetType = {
  weight: number;
  reps: number;
};

export type Exercise = {
  name: string;
  sets: SetType[];
  date: Date;
};

export const LOCAL_STORAGE_EXERCISE_KEY = "EXERCISES";
export const LOCAL_STORAGE_SELECTED_EXERCISE_KEY = "SELECTED_EXERCISE";
