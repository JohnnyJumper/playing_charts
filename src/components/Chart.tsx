import { Line } from "react-chartjs-2";
import "chart.js/auto";
import {
  selectedExercisesNames,
  selectedExercises,
} from "signals/exercise/selectedExercise";
import formatDate from "utils/formatDate";
import { totalVolume } from "utils/muscleHelpers";
import { BubbleDataPoint, ChartDataset, Point } from "chart.js";

export default function Chart() {
  const selected = selectedExercisesNames.value;

  function* getNextColor(): Generator<string, string, string> {
    const colors: string[] = [
      "rgb(220, 38, 38)",
      "rgb(234, 88, 12)",
      "rgb(217, 119, 6)",
      "rgb(202, 138, 4)",
      "rgb(101, 163, 13)",
      "rgb(22, 163, 74)",
      "rgb(5, 150, 105)",
      "rgb(13, 148, 136)",
      "rgb(8, 145, 178)",
      "rgb(2, 132, 199)",
      "rgb(37, 99, 235)",
      "rgb(79, 70, 229)",
      "rgb(124, 58, 237)",
      "rgb(147, 51, 234)",
      "rgb(192, 38, 211)",
      "rgb(219, 39, 119)",
      "rgb(225, 29, 72)",
    ];

    let index = 0;
    while (true) {
      yield colors[index]!;
      index = (index + 1) % colors.length;
    }
  }

  const colorGenerator = getNextColor();

  function createDataSet(
    exerciseName: string,
  ): [
    ChartDataset<"line", number | number[] | Point | BubbleDataPoint | null>,
    string[],
  ] {
    const label = exerciseName;
    const exercises = selectedExercises.value.filter(
      (exercise) => exercise.name === exerciseName,
    );

    return [
      {
        label,
        data: exercises.map((exercise) => totalVolume(exercise.sets)),
        fill: false,
        borderColor: colorGenerator.next().value,
        tension: 0.1,
      },
      exercises
        .flatMap((exercises) => exercises.date)
        .map((date) => formatDate(date)),
    ];
  }

  function createLineData() {
    if (selected == null || selected.length === 0) {
      return null;
    }

    const dataSets = selected.map((selectedExerciseName) =>
      createDataSet(selectedExerciseName),
    );

    const dates = dataSets.map((dataSet) => dataSet[1]);
    const longestSample = dates.reduce((longest, current) =>
      current.length > longest.length ? current : longest,
    );

    const data = {
      labels: longestSample,
      datasets: dataSets.map((dataset) => dataset[0]),
      type: "line",
    };

    return data;
  }

  const clearSelected = () => {
    selectedExercisesNames.value = [];
  };

  const lineData = createLineData();

  const removeSelected = (name: string) => {
    selectedExercisesNames.value =
      selectedExercisesNames.value?.filter(
        (exerciseName) => exerciseName !== name,
      ) ?? [];
  };

  return (
    <div className="flex h-screen flex-col justify-center px-4">
      <div className="mb-4 flex flex-col items-center">
        <h1 className="text-xl font-bold">Selected Exercises:</h1>

        {selectedExercisesNames.value?.map((name) => (
          <div
            className="my-2s flex w-60 select-none  items-center justify-between border p-2"
            key={name}
          >
            <div
              style={{
                backgroundColor: `${lineData?.datasets.find(
                  (dataset) => dataset.label === name,
                )?.borderColor}`,
              }}
              className="h-5 w-5"
            ></div>
            <p className="text-md">{name}</p>
            <button
              className="btn btn-primary btn-xs"
              onClick={() => removeSelected(name)}
            >
              x
            </button>
          </div>
        ))}

        {selectedExercisesNames.value?.length === 0 && (
          <p> Nothing is selected</p>
        )}
      </div>
      <div className="mb-4 flex justify-center">
        <button className="btn btn-primary" onClick={() => clearSelected()}>
          Clear All
        </button>
      </div>
      <div className="flex w-full items-center justify-center">
        {lineData && (
          <Line
            redraw={true}
            data={lineData}
            className="bg-base-content"
            color="green"
            options={{
              responsive: true,
            }}
          />
        )}
      </div>
    </div>
  );
}
