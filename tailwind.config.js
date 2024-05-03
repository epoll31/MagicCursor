/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "magic-cursor-enter": {
          from: {
            translate: `0 0`,
          },
          to: {
            translate: `var(--magic-cursor-x) var(--magic-cursor-y)`,
          },
        },
        "magic-cursor-exit": {
          from: {
            translate: `var(--magic-cursor-x) var(--magic-cursor-y)`,
            opacity: 1,
          },
          to: {
            translate: `0 0`,
            opacity: 0,
          },
        },
      },
      animation: {
        "magic-cursor-enter": "magic-cursor-enter 0.5s forwards",
        "magic-cursor-exit": "magic-cursor-exit 0.5s forwards",
      },
    },
  },
  plugins: [],
};
