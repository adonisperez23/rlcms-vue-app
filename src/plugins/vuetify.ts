import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as labsComponents from 'vuetify/labs/components'
// import { fa } from 'vuetify/iconsets/fa'

const myCustomLightTheme = {
  colors: {
    surface: '#fcecd2',
  },
}

export default createVuetify({
  components:{
    ...components,
    ...labsComponents
  },
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    },
  },
})
