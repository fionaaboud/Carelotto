/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f4eedf',
        ink: '#2d3428',
        olive: '#79845f',
        oliveDark: '#566047',
        oliveLight: '#a8ad86',
        blush: '#d99099',
        blueprint: '#9aa68c',
        receipt: '#fff9ea',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        soft: '0 24px 80px rgba(61, 70, 47, 0.14)',
        machine: '16px 18px 0 rgba(58, 68, 46, 0.14)',
      },
    },
  },
  plugins: [],
};
