import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import "./assets/theme.css";
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp } from "./firebase";
import { createPinia } from "pinia";

const pinia = createPinia();
const aVuePaulistaApp = createApp(App);

aVuePaulistaApp.use(PrimeVue, { ripple: true });
aVuePaulistaApp.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});
aVuePaulistaApp.use(pinia);

aVuePaulistaApp.mount("#app");
