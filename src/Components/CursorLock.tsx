import { motion, MotionProps, Variant } from "framer-motion";
import { PropsWithChildren, useContext, useMemo, useRef } from "react";
import { MagicCursorContext } from "./MagicCursorProvider";

export default function CursorLock({
  noLock = false,
  holdLock = false,
  normalVariant = {},
  lockVariant = {},
  cursorVariant = {},
  ...props
}: {
  noLock?: boolean;
  holdLock?: boolean;
  normalVariant?: Variant;
  lockVariant?: Variant;
  cursorVariant?: Variant;
  className?: string;
} & PropsWithChildren<Omit<MotionProps, "variants">>) {
  const { locked, lock, unlock } = useContext(MagicCursorContext);
  const ref = useRef<HTMLDivElement>(null);

  const handleEnter = useMemo(() => {
    return () => {
      if (!noLock && ref) {
        lock(ref);
      }
    };
  }, [noLock, ref, lock]);

  const handleLeave = useMemo(() => {
    return () => {
      if (!holdLock) {
        unlock();
      }
    };
  }, [holdLock, unlock]);
  return (
    <motion.div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      ref={ref}
      variants={{
        normal: normalVariant,
        locked: lockVariant,
      }}
      initial="normal"
      animate={locked ? "locked" : "normal"}
      {...props}
    ></motion.div>
  );
}
