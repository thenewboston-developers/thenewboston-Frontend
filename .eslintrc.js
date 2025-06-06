module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-throw-literal': 'off',
        '@typescript-eslint/only-throw-error': 'off',
      },
    },
  ],
  parserOptions: {
    createDefaultProgram: true,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'jest', 'import', 'simple-import-sort'],
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Node.js builtins
          ['^node:'],
          // React and external packages
          ['^react', '^@?\\w'],
          // Internal packages
          ['^(api|assets|components|config|constants|containers|dispatchers|enums|hooks|layouts|modals|pages|routers|selectors|store|styles|types|utils)(/.*|$)'],
          // Side effect imports
          ['^\\u0000'],
          // Parent imports
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports
          ['^.+\\.s?css$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        format: null,
        leadingUnderscore: 'allow',
        selector: 'default',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'arrow-body-style': 'off',
    'consistent-return': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'error',
    'import/prefer-default-export': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/no-noninteractive-tabindex': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-param-reassign': 'off',
    'no-restricted-globals': 'off',
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    'prefer-arrow-callback': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/button-has-type': 'off',
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/function-component-definition': 'off',
    'import/no-cycle': 'off',
    'no-useless-catch': 'off',
    'no-useless-return': 'off',
    'no-else-return': 'off',
    'react/no-children-prop': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/self-closing-comp': 'off',
    'react/jsx-fragments': 'off',
    'prefer-template': 'off',
    'no-underscore-dangle': 'off',
    'radix': 'off',
    'import/order': 'off',
    'import/no-duplicates': 'off',
    'no-unneeded-ternary': 'off',
    'object-shorthand': 'off',
    'eqeqeq': 'off',
    'no-extra-boolean-cast': 'off',
    'react/jsx-boolean-value': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-useless-rename': 'off',
    'sort-keys': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
