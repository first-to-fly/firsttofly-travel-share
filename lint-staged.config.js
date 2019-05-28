module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'prettier-eslint --write',
    'git add',
  ],
  '*.{css,less,scss,sss}': [
    'prettier-stylelint --write',
    'git add',
  ],
};
