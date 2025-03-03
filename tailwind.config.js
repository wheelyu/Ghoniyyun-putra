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
          secondary: "#bd2020",
          third: "#E0E0E0",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      
  },
  },

  
};
