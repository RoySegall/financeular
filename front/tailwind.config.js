module.exports = {
  purge: ['./src/**/*.js', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        green: {
          dark: '#006d77',
          light: '#83c5be',
        },
        white: {
          header: '#edf6f9'
        },
      },
      backgroundColor: {
        green: {
          header: '#006d77'
        },
        white: {
          header: '#edf6f9',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
