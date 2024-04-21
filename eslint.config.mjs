// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
  },
  {
  // Without `files`, they are general rules for all files
    rules: {
      'no-console': 'off',
      'antfu/top-level-function': 'off',
      'vue/comma-dangle': 'off',
      'vue/space-unary-ops': 'off',
      'vue/dot-location': 'off',
      'vue/space-infix-ops': 'off',
      'vue/object-curly-newline': 'off',
    },
  },
)
