// components/WelcomeScreen.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function WelcomeScreen() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 5600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showWelcome && (
        <div className="h-screen w-full relative overflow-hidden font-sans bg-black">
          {/* Background Image */}
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full z-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1950&q=80')",
            }}
          />

          {/* Vertical Wipe to Half-Screen with gradient and blur */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "50%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1.2 }}
            className="absolute top-0 left-0 w-1/2 h-full z-20 bg-gradient-to-br from-white to-neutral-200 backdrop-blur-lg shadow-2xl"
          >
            <div className="flex items-center justify-center h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 2 }}
                className="text-center"
              >
                <h1 className="text-black text-6xl md:text-8xl font-extrabold tracking-widest uppercase drop-shadow-md">
                  Welcome
                </h1>
                <p className="mt-4 text-black/60 text-lg md:text-xl tracking-wide italic">
                  Let’s build something extraordinary
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Subtle vignette fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 4.5, duration: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80 z-30"
          />
        </div>
      )}
    </AnimatePresence>
  );
}
