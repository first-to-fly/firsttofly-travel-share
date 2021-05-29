module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-scss",
  ],
  plugins: [
    "stylelint-scss",
  ],
  ignoreFiles: [
    "**/*.js",
    "**/*.jsx",
    "**/*.ts",
    "**/*.tsx",
  ],
  rules: {
    "string-quotes": "double",
    "property-no-unknown": [
      true,
      { ignoreProperties: ["composes"] },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["global"] },
    ],
    "no-descending-specificity": null,
    "no-invalid-position-at-import-rule": null,
  },
};
