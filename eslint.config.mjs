import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['node_modules', 'dist', 'package-lock.json', '.angular/cache', 'eslint.config.mjs'],
    files: ["**/*.ts", "*.ts"],
    languageOptions: { globals: globals.browser },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': [
        'error',
        { singleQuote: true, printWidth: 80, trailingComma: 'es5' },
      ],
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  // js.configs.recommended, // ✅ Replaces "eslint:recommended"
  //   typescriptPlugin.configs.recommended, // ✅ Replaces "plugin:@typescript-eslint/recommended"
  // prettier, //
];