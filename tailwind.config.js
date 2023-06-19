/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        primary: "#065f46",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
