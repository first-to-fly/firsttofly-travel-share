module.exports = {

  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-prettier-scss",
  ],

  rules: {
    indentation: [2, { ignore: "value" }],
    "max-line-length": 200,
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }],
    "string-quotes": "double",
    "scss/at-extend-no-missing-placeholder": null, // Allows @extend .class
    "scss/no-global-function-names": null, // math and color.adjust cannot compile
  },

  overrides: [
  ],

};
