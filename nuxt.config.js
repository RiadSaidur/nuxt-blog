import colors from 'vuetify/es5/util/colors'

const defaultImage = "https://images.unsplash.com/photo-1533850595620-7b1711221751?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsbGluZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - nuxt-blog-ts',
    title: 'nuxt-blog-ts',
    meta: [
      { 
        charset: 'utf-8' 
      },

      { 
        name: 'viewport', content: 'width=device-width, initial-scale=1' 
      },

      { 
        hid: 'description', name: 'description', content: 'Explore and Share your Experience with Bangladesh' 
      },

      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Explore and Share your Experience'
      },
      
      {
        hid: 'og:image',
        property: 'og:image',
        content: defaultImage
      },
      
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'nuxt-blog'
      },
      
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'nuxt-blog'
      },
      
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'Explore and Share your Experience'
      },
      
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: defaultImage
      },
      
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: 'nuxt-blog'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'quill/dist/quill.snow.css',
    '@/assets/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { 
      src: '@/plugins/vue-quil-editor.ts', 
      ssr: false 
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
    '@nuxtjs/dotenv'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  firebase: {
    config: {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      databaseURL: process.env.databaseURL,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
      measurementId: process.env.measurementId
    },
    
    services: {
      auth: {
        ssr: true,
        initialize: {
          // onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
          onAuthStateChangedAction: 'onAuthStateChangedAction'
        }
      }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
