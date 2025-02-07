/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend:{
      colors:{
        'backgroundc':"#E6E4EA",
        'login':"#4D5DB4",
        blue_gray: { 300: "#98a2b3", 800: "#344054", "800_01": "#3e4958" },
        gray: { 300: "#e6e3ea", 600: "#6b726d", 800: "#4f4f4f", 900: "#1e2122", "900_01": "#101828" },
        green: { 50: "#e9fbea" },
        teal: { 100: "#a5e1d5" },
        deep_orange: {
          300: "#e69163",
          400: "#ff834f",
          "400_cc": "#e67d41cc",
          A200: "#f2723d",
          A200_cc: "#fd792dcc",
          A200_3a: "#fd792d3a",
        },
        black: { "900_01": "#000000" },
        white: { A700: "#ffffff" },
        indigo: { A200: "#5e81f4" },
        amber: { A400: "#f6c002" },
        gray_600_01: "#737373",

      },
      boxShadow: { xs: "0px 4px 4px 0px #0000003f", sm: "0px 3.44px 12px 0px #00000026" },
   fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'output':["Output",'sans-serif']
    },
  },
},
 plugins: [require("@tailwindcss/forms")],
}