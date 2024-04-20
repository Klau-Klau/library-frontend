module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'plugin:vue/vue3-essential',
      'standard',
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: [
      'vue',
    ],
    rules: {
    },
    globals: {
      Stripe: 'readonly', // Dodaje Stripe jako globalną zmienną tylko do odczytu
    },
  };
  