module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
  ],
  plugins: [
    'stylelint-scss',
  ],
  ignoreFiles: [
    '**/*.js',
  ],
  rules: {
    'string-quotes': 'single',
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          'composes',
        ],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          'global',
        ],
      },
    ],
  },
};
