/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Prompt"],
    },
    extend: {
      minWidth: {
        40: "2.5rem",
        320: "20rem",
      },
      minHeight: {
        44: "2.75rem",
        48: "3rem",
        56: "3.5rem",
      },
    },
  },
  plugins: [],
};
