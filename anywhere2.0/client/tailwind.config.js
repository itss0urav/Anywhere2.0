/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "open-sans": ["Open Sans", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        "fira-code": ["Fira Code", "monospace"],
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
