module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'prettier --write',
    'eslint --fix',
    'git add',
  ],
  '*.{css,less,scss,sss}': [
    'prettier-stylelint --write',
    'git add',
  ],
};
