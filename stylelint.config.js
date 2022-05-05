module.exports = {
  extends: [
    "stylelint-config-standard-scss",
  ],
  rules: {
    "string-quotes": "double",
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["global"] },
    ],

    // New errors
    "alpha-value-notation": null,
    "color-function-notation": null,
    "declaration-block-no-redundant-longhand-properties": null,
    "function-url-quotes": null,
    "max-line-length": null,
    "media-feature-name-no-vendor-prefix": null,
    "no-descending-specificity": null,
    "property-no-vendor-prefix": null,
    "scss/at-extend-no-missing-placeholder": null,
    "scss/at-import-no-partial-leading-underscore": null,
    "scss/at-import-partial-extension": null,
    "scss/comment-no-empty": null,
    "shorthand-property-no-redundant-values": null,
    "value-no-vendor-prefix": null,
  },
};
