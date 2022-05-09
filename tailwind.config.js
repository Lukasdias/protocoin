/* 
  Explore configuration options docs https://tailwindcss.com/docs/configuration#configuration-options
  Or check the default configuration https://unpkg.com/browse/tailwindcss@latest/stubs/defaultConfig.stub.js
*/
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'proto-brand': '#F4900C',
        'proto-stroke': '#B6B6B6',
        'proto-dashboard-background': '#131313',
        'proto-dashboard-gap': '#404040',
        'proto-wallet-down': '#FF1313',
        'proto-wallet-up': ''
      }
    },
    fontFamily: {
      sans: ['Public sans', 'sans-serif'],
      serif: ['Public sans', 'serif']
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}
