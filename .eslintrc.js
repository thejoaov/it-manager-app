module.exports = {
  env: {
    jest: true,
  },
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:react/jsx-runtime',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'import', 'prettier', 'jsx-a11y'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'react/no-unused-prop-types': [2, { ignore: ['testID'] }],
    'react/require-default-props': 'off',
    'react/style-prop-object': 'off',
    'react/function-component-definition': 'off',
    'global-require': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'prettier/prettier': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    'import/extensions': ['error', 'never'],
    'react/prop-types': 'off',
    'react/no-unused-prop-types': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-namespace': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
