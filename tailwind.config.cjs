/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Prompt"],
    },
    extend: {
      minWidth: {
        320: "20rem",
      },
    },
  },
  plugins: [],
};
