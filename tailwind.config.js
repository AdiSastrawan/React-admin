/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#dde8f8",
        primary: "#193d76",
        secondary: "#c4d6f3",
        accent: "#2964c2",
      },
      fontFamily: {
        roboto: ["Roboto", "san-serif"],
      },
    },
  },
  plugins: [],
};
