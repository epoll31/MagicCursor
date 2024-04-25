import { Variant, motion, useMotionValue } from "framer-motion";
import { useContext, useEffect, useMemo, useState } from "react";
import { MagicCursorContext } from "./MagicCursorProvider";

export default function MagicCursor() {
  const defaultVariant: Variant = {
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  };

  const { state, locked, mouse } = useContext(MagicCursorContext);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // // Transform motion values using the mouse coordinates
  useEffect(() => {
    x.set(mouse.coord.x - 8);
    y.set(mouse.coord.y - 8);
  }, [mouse.coord.x, mouse.coord.y]);

  // const followingVariant: Variant = useMemo(() => {
  //   return {
  //     ...defaultVariant,
  //     x: x.get(),
  //     y: y.get(),
  //   };
  // }, [x, y]);
  // const followingVariant: Variant = useMemo(() => {
  //   return {
  //     ...defaultVariant,
  //     x: mouse.coord.x - 8,
  //     y: mouse.coord.y - 8,
  //   };
  // }, [mouse.coord]);
  const followingVariant: Variant = {
    ...defaultVariant,
    x: mouse.coord.x - 8,
    y: mouse.coord.y - 8,
  };

  const lockVariant: Variant = useMemo(() => {
    // if (!state.lockAt) {
    //   return defaultVariant;
    // }
    // return {
    //   ...defaultVariant,
    //   x: state.lockAt.x,
    //   y: state.lockAt.x,
    // };
    return defaultVariant;
  }, [state]);

  return (
    <motion.div
      className={`fixed -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-red-400 w-4 h-4 rounded-full`}
      // variants={{
      //   following: followingVariant,
      //   locked: lockVariant,
      // }}
      initial="following"
      // animate={locked ? "locked" : "following"}
      animate={{
        x: x.get(),
        y: y.get(),
      }}
    />
  );
}
