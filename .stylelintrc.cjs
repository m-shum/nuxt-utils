module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-prettier-scss',
  ],
  plugins: ['stylelint-order', 'stylelint-prettier'],
  rules: {
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-alphabetical-order': true,
    'prettier/prettier': [
      true,
      {
        singleQuote: true,
      },
    ],
    'selector-class-pattern': [
      /^[a-z]+(?:-[a-z]+)*(?:_{2}[a-z]+(?:-[a-z]+)*)?(?:-{2}[a-z]+(?:-[a-z]+)*)?$/,
      {
        resolveNestedSelectors: true,
      },
    ],
  },
}
