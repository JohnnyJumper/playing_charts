import Chart from "./components/Chart";
import { SideBar } from "./components/SideBar";

function App() {
  return (
    <div className="App overflow-y-scroll no-scrollbar h-full">
      <div className="grid grid-cols-4 h-full">
        <div className="col-span-3">
          <Chart />
        </div>
        <SideBar />
      </div>
    </div>
  );
}

export default App;
