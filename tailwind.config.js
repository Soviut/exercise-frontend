module.exports = {
  darkMode: 'class',

  mode: 'jit',
  purge: {
    content: [
      'index.{html,tsx}',
      'App.tsx',
      'pages/**/*.{ts,tsx}',
      'components/**/*.{ts,tsx}',
    ],
  },

  theme: {
    extend: {
      screens: {
        lg: '980px',
      },
    },
  },

  plugins: [],
}
