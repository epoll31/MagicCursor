import "./App.css";
import CursorLock from "./Components/CursorLock";
// import CursorLock from "./Components/CursorLock";
import MagicCursorProvider from "./Components/MagicCursorProvider";

function App() {
  return (
    <div className="fixed w-screen h-screen bg-neutral-700 flex flex-col gap-10 justify-center items-center -z-20">
      <div className="row-start-1 row-span-1 col-start-1 col-span-full">
        <h1 className="text-3xl text-neutral-200 text-center">
          Magic Cursor Demo
        </h1>
        <h2 className="text-xl text-neutral-200 text-center">by epoll31</h2>
        <MagicCursorProvider>
          <div className="w-[500px] h-[500px] bg-neutral-500 p-5 gap-5 flex flex-wrap">
            <CursorLock className="w-24 h-24 bg-neutral-400"></CursorLock>
            <div className="w-24 h-24 bg-neutral-400"></div>
          </div>
        </MagicCursorProvider>
      </div>
    </div>
  );
}

export default App;
