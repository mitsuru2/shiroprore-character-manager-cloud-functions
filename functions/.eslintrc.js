module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  rules: {
    'quotes': ['error', 'single'],
    'max-len': 0,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
};
