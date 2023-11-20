module.exports = {

  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-prettier-scss",
  ],

  rules: {
    "color-function-notation": "legacy",
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }],
    "scss/at-extend-no-missing-placeholder": null, // Allows @extend .class
    "scss/no-global-function-names": null, // math and color.adjust cannot compile
  },

  overrides: [
  ],

};
