import './App.css';
import { MagicCursor, CursorLock, MagicCursorProvider, DefaultState } from './Components/MagicCursor';

function Comp({
  test
}: {
  test?: boolean;
}) {
  console.log(test ? 'use' : 'dont use');
  return (
    <div>
      <h1>Test</h1>
    </div>
  );
}

function App() {
  return (
    <MagicCursorProvider value={{
      ...DefaultState,
      followingStyle: {
        // animation: 'scaleUpDown 0.5s infinite alternate ease-in-out'
        // transformOrigin: 'center',
      },
    }}>
      <div className='fixed w-screen h-screen bg-neutral-700 flex flex-col gap-10 justify-center items-center'>
        <div className='row-start-1 row-span-1 col-start-1 col-span-full'>
          <h1 className='text-3xl text-neutral-200 text-center'>Magic Cursor Demo</h1>
          <h2 className='text-xl text-neutral-200 text-center'>by epoll31</h2>
        </div>
        <CursorLock noLock className='grid grid-rows-3 grid-cols-3 gap-5 w-[600px] h-min justify-center items-center'>
          <CursorLock
            holdLock
            className='rounded-2xl bg-red-500 row-start-1 row-span-1 col-start-1 col-span-1 aspect-square z-20 '
            lockClassName='w-[200px] h-[200px] rounded-2xl bg-neutral-200 backdrop-invert transition-all duration-300 ease-in-out z-10'
          ></CursorLock>
          <CursorLock
            holdLock
            className='rounded-2xl bg-green-500 row-start-1 row-span-1 col-start-2 col-span-1 aspect-square'
            lockClassName='w-[200px] h-[200px] rounded-2xl bg-neutral-200 backdrop-invert transition-all duration-300 ease-in-out'
          ></CursorLock>
          <CursorLock
            holdLock
            className='rounded-2xl bg-blue-500 row-start-1 row-span-1 col-start-3 col-span-1 aspect-square'
            lockClassName='w-[200px] h-[200px] rounded-2xl bg-neutral-200 backdrop-invert transition-all duration-300 ease-in-out'
          ></CursorLock>
          <CursorLock
            holdLock
            className='rounded-2xl bg-yellow-500 row-start-2 row-span-1 col-start-1 col-span-1 aspect-square'
            lockClassName='w-[200px] h-[200px] rounded-2xl bg-neutral-200 backdrop-invert transition-all duration-300 ease-in-out'
          ></CursorLock>
          <CursorLock
            holdLock
            className='rounded-2xl bg-purple-500 row-start-2 row-span-1 col-start-2 col-span-1 aspect-square'
            lockClassName='w-[200px] h-[200px] rounded-2xl bg-neutral-200 backdrop-invert transition-all duration-300 ease-in-out'
          ></CursorLock>
          <CursorLock
            holdLock
            className='rounded-2xl bg-pink-500 row-start-2 row-span-1 col-start-3 col-span-1 aspect-square'
            lockClassName='w-[200px] h-[200px] rounded-2xl bg-neutral-200 backdrop-invert transition-all duration-300 ease-in-out'
          ></CursorLock>
          <CursorLock
            holdLock
            className='rounded-2xl bg-indigo-500 row-start-3 row-span-1 col-start-1 col-span-1 aspect-square'
            lockClassName='w-[200px] h-[200px] rounded-2xl bg-neutral-200 backdrop-invert transition-all duration-300 ease-in-out'
          ></CursorLock>
          <CursorLock
            holdLock
            className='rounded-2xl bg-cyan-500 row-start-3 row-span-1 col-start-2 col-span-1 aspect-square'
            lockClassName='w-[200px] h-[200px] rounded-2xl bg-neutral-200 backdrop-invert transition-all duration-300 ease-in-out'
          ></CursorLock>
          <CursorLock
            holdLock
            className='rounded-2xl bg-orange-500 row-start-3 row-span-1 col-start-3 col-span-1 aspect-square'
            lockClassName='w-[200px] h-[200px] rounded-2xl bg-neutral-200 backdrop-invert transition-all duration-300 ease-in-out'
          ></CursorLock>
        </CursorLock>
      </div>
    </MagicCursorProvider >
  );
}

export default App;
