/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 네이밍은 언제든지 바꿔주십셔~!
        'pink-1': '#D72E96',
        'pink-2': '#E24FA9',
        'purple-1': '#463256',
        'blue-1': '#3F51A2',
        'blue-2': '#2D5C91',
        'blue-3': '#4497D4',
        'blue-4': '#016DFF',
        'skyblue-1': '#64C0DF',
        'skyblue-2': '#AAE1E6',
      },
      fontFamily: {
        custum_heading: ['OneMobilePop', 'sans-serif'],
        custum_body:['SCoreDream', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
