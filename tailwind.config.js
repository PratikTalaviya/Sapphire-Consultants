/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        // // Tailwind Default Breakpoints
        // 'sm': '640px',  // Small devices (phones)
        // 'md': '768px',  // Medium devices (tablets)
        // 'lg': '1024px', // Large devices (desktops)
        // 'xl': '1280px', // Extra large devices (large desktops)
        // '2xl': '1536px', // 2X large devices (larger desktops)
        xs: "320px", // Extra small devices (small phones)
        "2xs": "375px", // Extra small-medium devices (medium phones)
        "3xl": "1920px", // 3X large devices (HD monitors)
        "4xl": "2560px", // 4X large devices (2K monitors)
        "5xl": "3840px", // 5X large devices (4K monitors)
      },
    },
  },
  plugins: [],
};
