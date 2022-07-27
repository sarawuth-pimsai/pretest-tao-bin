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
    },
  },
  plugins: [],
};
