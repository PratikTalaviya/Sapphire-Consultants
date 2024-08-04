import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [leftPosition, setLeftPosition] = useState(getLeftPosition(window.innerWidth)); // Initialize with a calculated value

  function remToPx(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  function getLeftPosition(width) {
    const offset = remToPx(6); // Convert 6rem to px
    return width - offset;
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  useEffect(() => {
    const handleResize = () => {
      setLeftPosition(getLeftPosition(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let timeoutId;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      timeoutId = setTimeout(() => {
        document.body.style.overflow = "";
      }, 1000);
    }

    // Cleanup function to reset the overflow property and clear the timeout when the component unmounts or menuOpen changes
    return () => {
      clearTimeout(timeoutId);
      if (!menuOpen) {
        // Prevent resetting overflow immediately on component unmount
        setTimeout(() => {
          document.body.style.overflow = "";
        }, 1000);
      }
    };
  }, [menuOpen]);

  return (
    <>
      <div className="overflow-hidden z-9">
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: "1rem", width: "2rem", top: "2.5rem", right: "3rem" }}
              animate={{ height: "500vh", width: "500vh", top: "-250vh", left: "-25vh" }}
              // initial={{ bottom: "100vh", y: "-100vh", x: 0 }}
              // animate={{ bottom: "-100vh", y: "50vh", x: "-25vh" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              exit={{
                height: "2rem",
                width: "4rem",
                top: "2rem",
                right: "2rem",
                left: `${leftPosition}px`,
              }}
              // exit={{ bottom: "100vh", y: "-100vh", x: 0 }}
              // className="absolute w-[500vh] h-[500vh] rounded-full bg-black overflow-hidden"
              className="absolute h-[2rem] w-[4rem] bg-black rounded-full right-[2rem] top-[2rem]"
            ></motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="h-[6rem] w-full bg-transparent p-[2rem] flex justify-between z-10 relative">
        <h1 className="text-[1.6rem]">Sapphire Consultants</h1>
        <button onClick={toggleMenu} className="text-[0.8rem] h-[2rem] w-[4rem] bg-gray-300 rounded-2xl font-normal">
          MENU
        </button>
      </div>
    </>
  );
}

export default Header;
