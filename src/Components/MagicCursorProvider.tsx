import {
  MouseEvent,
  MouseEventHandler,
  createContext,
  useRef,
  useState,
} from "react";
import { Variant, motion } from "framer-motion";

export interface MagicCursorState {
  lockRef?: React.RefObject<HTMLDivElement>;
  outerRef?: React.RefObject<HTMLDivElement>;
  cursorVariant: Variant;
}
export interface MouseState {
  coord: Coordinate;
  hover: boolean;
}

export interface Coordinate {
  x: number;
  y: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}

function getRelativeCoordinates(
  event: MouseEvent,
  referenceElement: HTMLElement
): Coordinate {
  const position = {
    x: event.pageX,
    y: event.pageY,
  };

  const offset = {
    left: referenceElement.offsetLeft,
    top: referenceElement.offsetTop,
    width: referenceElement.clientWidth,
    height: referenceElement.clientHeight,
  };

  let reference: HTMLElement | null =
    referenceElement.offsetParent as HTMLElement;

  while (reference) {
    offset.left += reference.offsetLeft;
    offset.top += reference.offsetTop;
    reference = reference.offsetParent as HTMLElement;
  }

  return {
    x: position.x - offset.left,
    y: position.y - offset.top,
    width: offset.width,
    height: offset.height,
    centerX: (position.x - offset.left - offset.width / 2) / (offset.width / 2),
    centerY:
      (position.y - offset.top - offset.height / 2) / (offset.height / 2),
  };
}

export const DefaultState: MagicCursorState = {
  lockRef: undefined,
  outerRef: undefined,
  cursorVariant: {},
};
export const DefaultMouse: MouseState = {
  coord: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    centerX: 0,
    centerY: 0,
  },
  hover: false,
};

export const MagicCursorContext = createContext({
  state: DefaultState,
  mouse: DefaultMouse,
  locked: false,
  lock: (_ref: React.RefObject<HTMLDivElement>) => {},
  unlock: () => {},
});

export default function MagicCursorProvider(props: {
  children: React.ReactNode;
}) {
  const outerRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState(DefaultState);
  const [mouse, setMouse] = useState(DefaultMouse);

  const lock = (ref: React.RefObject<HTMLDivElement>) => {
    setState({
      ...state,
      lockRef: ref,
    });
  };
  const unlock = () => {
    setState({
      ...state,
      lockRef: undefined,
    });
  };

  const handleMouseMove: MouseEventHandler = (
    e: MouseEvent<HTMLDivElement>
  ) => {
    if (!outerRef.current) {
      setMouse(DefaultMouse);
      return;
    }

    setMouse({
      ...mouse,
      coord: getRelativeCoordinates(e, outerRef.current),
    });
  };

  const handleMouseEnter: MouseEventHandler = () => {
    setMouse({
      ...mouse,
      hover: true,
    });
  };
  const handleMouseLeave: MouseEventHandler = () => {
    setMouse({
      ...mouse,
      hover: false,
    });
  };

  return (
    <MagicCursorContext.Provider
      value={{
        state,
        locked: state.lockRef !== undefined,
        lock,
        unlock,
        mouse,
      }}
    >
      <div
        className="w-fit h-fit relative"
        ref={outerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {props.children}
        <motion.div
          className={`relative -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-red-400 w-4 h-4 rounded-full`}
          // variants={{
          //   following: followingVariant,
          //   locked: lockVariant,
          // }}
          initial="following"
          // animate={locked ? "locked" : "following"}
          animate={{
            x: mouse.coord.x,
            y: mouse.coord.y,
          }}
        />
      </div>
    </MagicCursorContext.Provider>
  );
}
