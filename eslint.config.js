const eslint = require('@eslint/js');
const eslintConfigPrettier = require('eslint-config-prettier');
const globals = require('globals');

module.exports = [
  eslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.js', '**/*.mjs'],
    ignores: ['_site/*'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      sourceType: 'commonjs',
    },
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: true,
    },
  },
];
