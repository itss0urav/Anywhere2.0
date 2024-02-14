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
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
      opacity: {
        '20': '0.2',
      },
    },
  },
  variants: {
    extend: {
      backdropFilter: ['responsive'], // or other variants you need
    },
  },
  plugins: [
    "prettier-plugin-tailwindcss",
    function ({ addComponents }) {
      const components = {
        ".red-btn": {
          "@apply bg-red-800 text-red-100 rounded px-4 py-2 transition-all duration-200 hover:bg-red-500 hover:text-white":
            {},
        },
        ".red-gradient-btn": {
          "@apply bg-gradient-to-r from-red-500 to-rose-900 text-white font-bold py-2 px-4 rounded":
            {},
        },
        ".green-gradient-btn": {
          "@apply bg-gradient-to-r from-green-500 to-green-900 text-white font-bold py-2 px-4 rounded":
            {},
        },
        ".blue-gradient-btn": {
          "@apply bg-gradient-to-r from-blue-600 to-blue-900 text-blue-100  transition-all duration-200 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded":
            {},
        },
      };
      addComponents(components);
    },
  ],
};
