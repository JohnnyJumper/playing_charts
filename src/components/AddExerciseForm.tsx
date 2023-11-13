import { ForwardedRef, forwardRef, useState } from "react";
import { Exercise, SetType } from "signals/exercise/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import formatDate from "utils/formatDate";

export default function AddExerciseForm({
  onClose,
}: {
  onClose: (exercise: Exercise) => void;
}) {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  const [sets, setSets] = useState<SetType[]>([]);

  const SetDateButton = forwardRef(
    (
      _props: { value: string; onClick: () => void },
      ref: ForwardedRef<HTMLButtonElement>,
    ) => (
      <button
        className="btn btn-primary  btn-xs"
        ref={ref}
        onClick={_props.onClick}
      >
        Set date
      </button>
    ),
  );

  return (
    <div className="h-94 flex w-full  flex-col items-center">
      <h3 className="pb-3 text-lg font-bold">Please add your exercise!</h3>
      <input
        type="text"
        placeholder="Exercise Name"
        className="input input-bordered w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex w-full items-center px-3 pt-3">
        <h4 className="text-lg">Date: {formatDate(date)}</h4>
        <div className="divider divider-horizontal select-none" />

        <DatePicker
          selected={date}
          onChange={(date) => {
            if (!date) {
              return;
            }
            setDate(date);
          }}
          customInput={
            <SetDateButton value={formatDate(date)} onClick={() => {}} />
          }
        />
      </div>
      <div className="divider divider-vertical select-none" />
      <div className="flex w-full flex-col items-center justify-center">
        {sets.map((set, index) => (
          <div key={index} className="w-full py-4">
            <h3>Set # {index + 1}</h3>
            <input
              type="number"
              placeholder="weight"
              className="input input-bordered"
              value={set.weight === 0 ? "" : set.weight}
              onChange={(e) =>
                setSets((prev) =>
                  prev.map((set, setIndex) =>
                    setIndex === index
                      ? { weight: parseInt(e.target.value), reps: set.reps }
                      : set,
                  ),
                )
              }
            />
            <input
              type="number"
              placeholder="reps"
              className="input input-bordered"
              value={set.reps === 0 ? "" : set.reps}
              onChange={(e) =>
                setSets((prev) =>
                  prev.map((set, setIndex) =>
                    setIndex === index
                      ? { weight: set.weight, reps: parseInt(e.target.value) }
                      : set,
                  ),
                )
              }
            />
          </div>
        ))}
        <button
          className="btn btn-secondary btn-xs"
          onClick={() => {
            setSets([...sets, { reps: 0, weight: 0 }]);
          }}
        >
          Add Set
        </button>
      </div>
      <button
        className="btn btn-primary btn-sm mt-4 self-end"
        onClick={() => onClose({ date, name, sets })}
      >
        Save
      </button>
    </div>
  );
}
