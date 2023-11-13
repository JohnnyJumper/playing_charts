import Chart from "./components/Chart";
import { SideBar } from "./components/SideBar";

function App() {
  return (
    <div className="App no-scrollbar h-full overflow-y-scroll">
      <div className="grid h-full grid-cols-4">
        <div className="col-span-3">
          <Chart />
        </div>
        <SideBar />
      </div>
    </div>
  );
}

export default App;
