/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customGray: "#1f2937",
      },
    },
  },
  plugins: [import("@tailwindcss/forms"), import("tailwind-scrollbar")],
};
