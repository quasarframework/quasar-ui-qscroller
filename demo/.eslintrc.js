module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,

  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  },

  env: {
    browser: true
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // Base ESLint recommended rules
    // 'eslint:recommended',

    // Uncomment any of the lines below to choose desired strictness,
    // but leave only one uncommented!
    // See https://eslint.vuejs.org/rules/#available-rules
    'plugin:vue/essential', // Priority A: Essential (Error Prevention)
    // 'plugin:vue/strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
    // 'plugin:vue/recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)

    'plugin:quasar/standard'

  ],

  plugins: [
    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
    // required to lint *.vue files
    'vue',
    'quasar'
  ],

  globals: {
    ga: true, // Google Analytics
    cordova: true,
    __statics: true,
    process: true,
    Capacitor: true,
    chrome: true
  },

  // add your custom rules here
  rules: {
    'brace-style': [ 'error', 'stroustrup', { allowSingleLine: true } ],
    'prefer-const': 'error',
    'prefer-promise-reject-errors': 'off',
    'multiline-ternary': 'off',
    'no-prototype-builtins': 'off',
    'no-case-declarations': 'off',
    'generator-star-spacing': 'off', // allow async-await
    'arrow-parens': 'off', // allow paren-less arrow functions
    'object-property-newline': 'off',
    'one-var': 'off',
    'no-void': 'off',
    'no-lone-blocks': 'error',
    'no-unused-expressions': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'no-unneeded-ternary': 'error',
    'no-confusing-arrow': [ 'error', { allowParens: true } ],
    'operator-linebreak': [ 'error', 'before' ],

    'array-bracket-spacing': [ 'error', 'always', { singleValue: false } ],
    'object-curly-spacing': [ 'error', 'always' ],
    'computed-property-spacing': [ 'error', 'always' ],
    'template-curly-spacing': [ 'error', 'always' ],

    'import/first': 'off',
    // 'import/named': 'error',
    // 'import/namespace': 'error',
    // 'import/default': 'error',
    // 'import/export': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-webpack-loader-syntax': 'off',

    // 'promise/always-return': 'warn',

    'vue/no-mutating-props': 'off',
    'vue/custom-event-name-casing': 'off',

    'vue/no-deprecated-slot-attribute': 'off', // Vue 3?
    'vue/no-deprecated-slot-scope-attribute': 'off', // Vue 3?
    'vue/no-deprecated-v-bind-sync': 'off', // Vue 3?

    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',

    'quasar/no-invalid-props': 'warn',
    'quasar/no-invalid-qfield-usage': 'warn',

    'no-void': 'off',

    // allow console.log during development only
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
