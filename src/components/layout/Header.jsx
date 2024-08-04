import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [leftPosition, setLeftPosition] = useState(getLeftPosition(window.innerWidth));
  const [diagonalSizePx, setDiagonalSizePx] = useState(calculateDiagonal(window.innerWidth, window.innerHeight) * 2);

  function remToPx(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  function getLeftPosition(width) {
    const offset = remToPx(6); // Convert 6rem to px
    return width - offset;
  }

  function calculateDiagonal(width, height) {
    return Math.sqrt(width * width + height * height);
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setLeftPosition(getLeftPosition(width));
      setDiagonalSizePx(calculateDiagonal(width, height) * 2);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Set or reset the overflow property based on the menuOpen state
    document.body.style.overflow = menuOpen ? "hidden" : "";

    // If the menu is open, also disable scroll on the document
    if (menuOpen) {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
      document.body.style.width = "";
    }

    // Cleanup function to reset styles when the component unmounts or menuOpen changes
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div className="overflow-hidden z-9">
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: "1rem", width: "2rem", top: "2.5rem", right: "3rem", opacity: 0.5 }}
              animate={{
                height: `${diagonalSizePx}px`,
                width: `${diagonalSizePx}px`,
                top: `-${diagonalSizePx / 2}px`,
                left: `-${diagonalSizePx / 3}px`,
                opacity: 1,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              exit={{
                height: "2rem",
                width: "4rem",
                top: "2rem",
                right: "2rem",
                left: `${leftPosition}px`,
                opacity: 0.5,
                transition: { duration: 0.6, ease: "easeInOut" },
              }}
              className="absolute rounded-full bg-black"
            >
              {/* <div
                style={{
                  top: `${diagonalSizePx / 2}px`,
                  left: `${diagonalSizePx / 3}px`,
                }}
                className="h-[5rem] w-[5rem] bg-green-300"
              ></div> */}
            </motion.div>
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
