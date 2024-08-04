import React, { useState } from "react";
import { motion } from "framer-motion";

const CircleExpand = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <motion.div
        className="absolute bg-blue-500 rounded-full"
        style={{
          width: isExpanded ? "300vh" : "50px",
          height: isExpanded ? "300vh" : "50px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        initial={false}
        animate={{
          width: isExpanded ? "300vh" : "50px",
          height: isExpanded ? "300vh" : "50px",
          transition: { duration: 0.8 },
        }}
      />
      <button
        className="absolute z-10 p-2 text-white bg-blue-700 rounded-full"
        style={{ top: "calc(50% - 25px)", left: "calc(50% - 25px)" }}
        onClick={handleToggle}
      >
        Menu
      </button>
    </div>
  );
};

export default CircleExpand;
