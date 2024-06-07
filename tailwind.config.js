/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2196f3",
        blackCustom: "#32353f",
        whiteCustomer: "#f9fcfc"
      },
      fontFamily: {
        "nunito": "Nunito, sans-serif"
      }
    },
  },
  plugins: [],
}

