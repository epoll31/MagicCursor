import React, { useEffect, useRef, useState } from "react";

export const MagicCursorContext = React.createContext<{
  locked: boolean;
  lock: (ref: React.RefObject<HTMLElement>) => void;
  unlock: () => void;
}>({
  locked: false,
  lock: () => {},
  unlock: () => {},
});

const MagicCursorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [lock, setLock] = useState<React.RefObject<HTMLElement> | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!outerRef.current) return;
      const x =
        e.clientX -
        outerRef.current.offsetLeft -
        outerRef.current.offsetWidth / 2;
      const y =
        e.clientY -
        outerRef.current.offsetTop -
        outerRef.current.offsetHeight / 2;

      outerRef.current.style.setProperty("--magic-cursor-x", `${x}px`);
      outerRef.current.style.setProperty("--magic-cursor-y", `${y}px`);
    };

    outerRef.current?.addEventListener("mousemove", handleMouseMove);

    return () => {
      outerRef.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    console.log("lock", lock);
  }, [lock]);

  return (
    <MagicCursorContext.Provider
      value={{
        locked: !!lock,
        lock: (ref) => {
          setLock(ref);
        },
        unlock: () => {
          setLock(null);
        },
      }}
    >
      <div
        ref={outerRef}
        className="relative w-fit h-fit group/magic-cursor-provider "
      >
        {children}
        <div className=" pointer-events-none absolute bg-red-400 w-5 h-5 rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2  animate-magic-cursor-exit group-hover/magic-cursor-provider:animate-magic-cursor-enter" />
      </div>
    </MagicCursorContext.Provider>
  );
};

export default MagicCursorProvider;
