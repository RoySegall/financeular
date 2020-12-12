const baseColors = {
  green: {
    dark: '#006d77',
    light: '#83c5be',
  },
  white: '#ffffff',
  light: {
    white: '#edf6f9'
  },
  peach: {
    light: '#ffddd2',
    dark: '#e29578',
  },
  brands: {
    google: '#d54a39',
    facebook: '#1392ec',
  }
};

module.exports = {
  purge: ['./src/**/*.js', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: baseColors,
      backgroundColor: baseColors,
      boxShadow: {
        red: '0 4px 30px 0 rgb(255 0 0 / 0.50);',
        yellow: '0 4px 30px 0 rgb(251 255 0 / 50%);',
        blue: '0 4px 30px 0 rgb(0 161 255 / 50%);',
        green: '0 4px 30px 0 rgb(16 255 0 / 50%);',
      },
    },
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    outline: false,
  },
  plugins: [],
}
