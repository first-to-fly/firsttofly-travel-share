module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-scss",
  ],
  plugins: [
    "stylelint-scss",
  ],
  ignoreFiles: [
    "node_modules/**",
    "**/*.js",
    "**/*.jsx",
    "**/*.ts",
    "**/*.tsx",
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
    "keyframes-name-pattern": null,
    "max-line-length": null,
    "media-feature-name-no-vendor-prefix": null,
    "no-descending-specificity": null,
    "property-no-vendor-prefix": null,
    "scss/at-extend-no-missing-placeholder": null,
    "scss/at-import-no-partial-leading-underscore": null,
    "scss/at-import-partial-extension": null,
    "scss/comment-no-empty": null,
    "selector-class-pattern": null,
    "selector-id-pattern": null,
    "shorthand-property-no-redundant-values": null,
    "value-no-vendor-prefix": null,
  },
};
