import tseslint from 'typescript-eslint';
import checkFile from 'eslint-plugin-check-file';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginSolid from 'eslint-plugin-solid';
import eslintPluginReact from 'eslint-plugin-react';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      parser: tseslint.parser,
      sourceType: 'module',
    },
    plugins: {
      'check-file': checkFile,
      'simple-import-sort': simpleImportSort,
      solid: eslintPluginSolid,
      react: eslintPluginReact,
    },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{js,ts,jsx,tsx}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-empty-pattern': 'error',
      'solid/prefer-for': 'error',
      'solid/prefer-classlist': 'error',
      'solid/no-react-specific-props': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        {
          props: 'never',
          children: 'never',
        },
      ],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'function-expression',
        },
      ],
    },
  },
);
