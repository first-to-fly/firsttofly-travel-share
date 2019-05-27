module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },

  extends: ['airbnb'],

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },

  plugins: ['react'],

  rules: {
    'array-element-newline': ['error', 'always'],
  },

  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
