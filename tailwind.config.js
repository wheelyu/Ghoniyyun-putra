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
          primary: "#dc2626",
          secondary: "#F9F9EB",
          third: "#E0E0E0",
      },
  },
  },
  plugins: [
    require('preline/plugin')
  ],
  
};
