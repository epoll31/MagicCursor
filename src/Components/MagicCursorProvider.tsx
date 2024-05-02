import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  MouseEvent,
} from "react";
import { motion, useMotionValue, useWillChange } from "framer-motion";

interface MousePosition {
  x: number;
  y: number;
}

const MagicCursorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const outerRef = useRef<HTMLDivElement>(null);
  // const [mouse, setMouse] = useState<MousePosition>({ x: 0, y: 0 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // const updateMousePosition = useCallback((position: MousePosition) => {
  //   // setMouse(position);
  //   x.set(position.x);
  //   y.set(position.y);
  // }, []);

  // const handleMouseMove = useCallback((event: MouseEvent) => {
  //   requestAnimationFrame(() => {
  //     if (outerRef.current) {
  //       const rect = outerRef.current.getBoundingClientRect();
  //       // const x = event.clientX - rect.left - 10; // 10 is half the size of the cursor (20px)
  //       // const y = event.clientY - rect.top - 10;
  //       x.set(event.clientX - rect.left - 10);
  //       y.set(event.clientY - rect.top - 10);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   const handle = outerRef.current;
  //   if (handle) {
  //     handle.addEventListener("mousemove", handleMouseMove as any);

  //     return () => {
  //       handle.removeEventListener("mousemove", handleMouseMove as any);
  //     };
  //   }
  // }, [handleMouseMove]);

  useEffect(() => {
    const handle = outerRef.current;
    if (handle) {
      const handleMouseMove = (event: MouseEvent) => {
        requestAnimationFrame(() => {
          const rect = handle.getBoundingClientRect();
          x.set(event.clientX - rect.left - 10);
          y.set(event.clientY - rect.top - 10);
        });
      };
      handle.addEventListener("mousemove", handleMouseMove as any);

      return () => {
        handle.removeEventListener("mousemove", handleMouseMove as any);
      };
    }
  }, [x, y]);

  return (
    <div ref={outerRef} className="relative w-fit h-fit">
      {children}
      <motion.div
        className="absolute bg-red-400"
        style={{
          width: "20px",
          height: "20px",
          translate: "-50%, -50%",
          borderRadius: "10px",
        }}
        animate={{
          x: x.get(),
          y: y.get(),
        }}
      />
    </div>
  );
};

export default MagicCursorProvider;
