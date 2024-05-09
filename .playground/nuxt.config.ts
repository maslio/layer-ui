export default defineNuxtConfig({
  extends: ['..'],
  devtools: {
    enabled: true,
  },
  ssr: false,
  components: {
    dirs: [
      {
        path: '../components',
        global: true,
      },
      {
        path: './components',
        global: true,
      },
    ],
  },
})
