// CommonJS
/* eslint-disable @typescript-eslint/no-var-requires */

const config = require("../.eslintrc");


module.exports = {
  ...config,

  extends: [
    ...(config.extends || []),
    "plugin:cypress/recommended",
  ],

  rules: {
    ...config.rules,
    "spaced-comment": "off",
  },
};
