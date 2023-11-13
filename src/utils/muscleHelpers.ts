import { SetType } from "signals/exercise/types";

export function totalVolume(sets: SetType[]): number {
  return sets.reduce((acc, set) => {
    return acc + set.reps * set.weight;
  }, 0);
}
