import antfu from '@antfu/eslint-config'
import { deepmerge } from 'deepmerge-ts'
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'

/**
 * Factory function to define ESLint configuration with
 * custom settings for the Kiwi Horizon monorepo.
 *
 * This function leverages the `@antfu/eslint-config` package
 * to create a base configuration and then customizes it
 *
 * @param {Parameters<typeof antfu>[0]} [config] - Options to override the base configuration.
 */
export function defineConfig(config) {
  return antfu(
    deepmerge(
      {
        formatters: true,
        stylistic: {
          semi: false,
          indent: 2,
          quotes: 'single',
          overrides: {
            'style/comma-dangle': ['error', 'always-multiline'],
            'style/array-bracket-newline': ['error', { multiline: true, minItems: 3 }],
            'style/function-call-argument-newline': ['error', 'consistent'],
            'style/brace-style': [
              'error',
              '1tbs',
              { allowSingleLine: true },
            ],
            'style/max-statements-per-line': ['error', { max: 2 }],
            'style/wrap-regex': 'error',
            'style/member-delimiter-style': 'error',
          },
        },
        plugins: {
          'no-relative-import-paths': noRelativeImportPaths,
        },
        regexp: { level: 'warn' },
        typescript: {
          overrides: {
            'ts/no-shadow': 'error',
            'ts/no-redeclare': 'off',
            'ts/array-type': ['error', { default: 'array' }],
            'ts/consistent-type-imports': 'off',
            'ts/naming-convention': [
              'error',
              {
                selector: 'variable',
                format: [
                  'camelCase',
                  'UPPER_CASE',
                  'PascalCase',
                ],
              },
              {
                selector: 'typeLike',
                format: ['PascalCase'],
              },
              {
                selector: 'class',
                format: ['PascalCase'],
              },
              {
                selector: 'interface',
                format: ['PascalCase'],
                custom: {
                  regex: '^I[A-Z]',
                  match: false,
                },
              },
            ],
          },
        },
        lessOpinionated: true,
        rules: {
          'antfu/no-top-level-await': 'off',

          'no-console': ['warn', { allow: ['warn', 'error'] }],
          'no-debugger': 'warn',

          'jsdoc/check-param-names': 'off',

          'no-relative-import-paths/no-relative-import-paths': 'off',

          'node/handle-callback-err': ['error', '^(err|error)$'],
          'node/prefer-global/process': ['error', 'always'],

          'unicorn/throw-new-error': 'off',
          'unicorn/filename-case': 'off',

          'unicorn/no-await-expression-member': 'error',
        },
      },
      config || {},
    ),
  ).disableRulesFix(['no-relative-import-paths/no-relative-import-paths'])
}
