import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt().append({
  files: ['**/Footer.vue', '**/Header.vue', '**/Logo.vue'],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
})
