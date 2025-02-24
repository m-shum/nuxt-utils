// https://nuxt.com/docs/api/configuration/nuxt-config
import stylelint from 'vite-plugin-stylelint'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: ['~/assets/scss/main.scss'],
  devtools: { enabled: true },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/lib/_vars.scss" as *;
            @use "~/assets/scss/lib/_breakpoints.scss" as *;
            @use "~/assets/scss/lib/_typography.scss" as *;
            @use "~/assets/scss/lib/_grid.scss" as *;
          `,
        },
      },
    },
    plugins: [stylelint()],
  },

  modules: ['@vueuse/nuxt'],
})
