"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BrandMark } from "@/src/shared/components";

const SPLASH_KEY = "mello-intro-seen";

export function IntroSplash() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduceMotion || sessionStorage.getItem(SPLASH_KEY)) return;

    setVisible(true);
    document.documentElement.classList.add("intro-is-playing");

    const timer = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SPLASH_KEY, "true");
      document.documentElement.classList.remove("intro-is-playing");
    }, 2400);

    return () => {
      window.clearTimeout(timer);
      document.documentElement.classList.remove("intro-is-playing");
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="mello-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-5%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <motion.div
            className="mello-intro-wordmark"
            initial={{ opacity: 0, scale: 0.86, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="mello-intro-mark"
              initial={{ rotate: -5 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <BrandMark variant="dark" size={170} />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              Mello
            </motion.span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.52, y: 0 }}
            transition={{ duration: 0.5, delay: 1.05 }}
          >
            Your voice, ready for action.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
