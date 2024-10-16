import { withUt } from "uploadthing/tw";

module.exports = withUt({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        }
      },
      colors: {
        orange: {
          100: '#FFF4E0', // Lightest shade
          200: '#FFE2B3', 
          300: '#FFD086', 
          400: '#FFBE5A', 
          500: '#ECA227', // Base color
          600: '#D38F20', 
          700: '#B9781A', 
          800: '#A06313', 
          900: '#804F0E', // Darkest shade
        }
      }
    }
  },
  plugins: []
});
