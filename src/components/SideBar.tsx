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
      (exercise) => exercise.name !== name
    );
  };

  return (
    <div className="flex flex-col select-none bg-primary-content">
      <div className="border-b-2 border-accent w-full flex justify-center items-center py-5">
        <p className="self-center">Exercises</p>
      </div>
      <ul className="list-none">
        {names.map((name) => (
          <li
            className={`p-4 border border-accent ${
              selectedNames?.includes(name)
                ? "bg-primary-content"
                : "bg-info-content"
            } hover:bg-secondary-content flex justify-between items-center`}
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
              className="btn btn-xs btn-secondary"
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
