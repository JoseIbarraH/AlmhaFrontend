/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // 🔹 Opcional, para que no te fastidie con nombres largos de componentes
    'vue/multi-word-component-names': 'off',

    // 🔹 Gusto personal, puedes dejar varias props en una línea
    'vue/max-attributes-per-line': 'off',

    // 🔹 Consistencia con .editorconfig
    'indent': ['error', 2],
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always'],
  },
};
