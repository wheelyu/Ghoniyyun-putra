/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      lineHeight: {
          "extra-loose": "2.5",
          12: "3rem",
      },
      colors: {
          primary: "#f87171",
          secondary: "#F9F9EB",
          third: "#E0E0E0",
      },
  },
  },
  plugins: [
    require('preline/plugin')
  ],
  
};
