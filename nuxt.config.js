const pkg = require("./package");
const i18nOptions = require("./locales/i18n");

module.exports = {
  mode: "spa",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      // {
      //   rel: "stylesheet",
      //   href:
      //     "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      // },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Noto+Sans+SC&display=swap"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["~/assets/style/app.styl", "~/assets/css/app.css"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/vuetify",
    "@/plugins/mixin",
    "@/plugins/vue-cookie.js",
    "@/plugins/underscore.js"
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    "@nuxtjs/axios",
    "nuxt-material-design-icons",
    ["nuxt-i18n", i18nOptions]
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
