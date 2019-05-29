// ESLint config file always in CommonJS
/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('../.eslintrc');

module.exports = {
  ...config,

  env: {
    ...config.env,
    mocha: true,
  },

  plugins: [
    ...config.plugins,
    'mocha',
  ],

  extends: [
    ...config.extends,
    'plugin:mocha/recommended',
  ],

  rules: {
    ...config.rules,
  },
};
