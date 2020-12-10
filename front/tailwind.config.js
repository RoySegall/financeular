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
