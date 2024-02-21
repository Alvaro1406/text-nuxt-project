// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
  },

  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCES_TOKEN,
    jwtRefreshSecret: process.env.JWT_RFRESH_TOKEN,
  },
});
