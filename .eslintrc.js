module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./packages/*/tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  extends: ['prettier', 'next'],
  rules: {
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'jsx-a11y/role-supports-aria-props': 0,
    'jsx-a11y/no-redundant-roles': 0,
    'jsx-a11y/anchor-has-content': 0,
    'no-plusplus': 0,
    'no-nested-ternary': 0,
    'no-alert': 0,
    'import/no-extraneous-dependencies': 0,
    'react/no-array-index-key': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-unused-prop-types': 0,
    'react/require-default-props': 0,
    'react/prop-types': 0,
    'no-console': 1,
    'class-methods-use-this': 0,
    'no-restricted-syntax': 0,
  },
};
