import React from "react";
import { exerciseNames, exercises } from "signals/exercise/exercise";

import AddIcon from "assets/add-icon";
import useModal from "hooks/useModal";
import AddExerciseForm from "./AddExerciseForm";
import { Exercise } from "signals/exercise/types";
import { selectedExercisesNames } from "signals/exercise/selectedExercise";

export const SideBar: React.FC<{}> = ({}) => {
  const names = exerciseNames.value;
  const selectedNames = selectedExercisesNames.value;

  const { Modal, openModal, closeModal } = useModal({
    id: "addExercise",
  });

  const onClose = (exercise: Exercise) => {
    if (exercise.name && exercise.date && exercise.sets.length !== 0) {
      exercises.value = [...exercises.value, exercise];
    }
    closeModal();
  };

  const deleteExercise = (name: string) => {
    exercises.value = exercises.value.filter(
      (exercise) => exercise.name !== name,
    );
  };

  return (
    <div className="flex select-none flex-col bg-primary-content">
      <div className="flex w-full items-center justify-center border-b-2 border-accent py-5">
        <p className="self-center">Exercises</p>
      </div>
      <ul className="list-none">
        {names.map((name) => (
          <li
            className={`border border-accent p-4 ${
              selectedNames?.includes(name)
                ? "bg-primary-content"
                : "bg-info-content"
            } flex items-center justify-between hover:bg-secondary-content`}
            onClick={() => {
              if (selectedNames?.includes(name) === false) {
                selectedExercisesNames.value = [
                  ...(selectedExercisesNames.value ?? []),
                  name,
                ];
              }
            }}
            key={name}
          >
            {name}
            <button
              className="btn btn-secondary btn-xs"
              onClick={() => deleteExercise(name)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-0 right-10 p-4">
        <button
          className="btn btn-circle bg-primary hover:bg-secondary"
          onClick={openModal}
        >
          <AddIcon className="fill-black p-3 hover:fill-accent" />
        </button>
      </div>
      <Modal>
        <AddExerciseForm onClose={onClose} />
      </Modal>
    </div>
  );
};
