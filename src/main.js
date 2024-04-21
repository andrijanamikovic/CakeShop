import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vuetify/styles";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseCard from "./components/ui/BaseCard.vue";

const app = createApp(App);

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  ssr: true,
  components,
  directives,
  breakpoint: {
    thresholds: {
      xs: 340,
      sm: 540,
      md: 800,
      lg: 1280,
    },
    scrollBarWidth: 24,
  },
});

app.component("base-button", BaseButton);
app.component("base-card", BaseCard);
app.use(vuetify);
app.use(router);
app.use(store);
app.mount("#app");
