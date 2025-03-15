// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'no-console': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
}).override('nuxt/typescript', {
  rules: {
    // Add or modify TypeScript-specific rules here
    '@typescript-eslint/semi': ['error', 'never'],
  },
})
