import { createApp } from 'vue';
import App from './App.vue';
import { createMetaManager } from 'vue-meta';
import router from './router';
import store from './store';
import ApiService from "@/store/api.service";
import './css/style.css';

/* import the fontawesome core */
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';


// Create the app instance
const app = createApp(App)
  .use(router)
  .use(store)
  .use(createMetaManager());


ApiService.init();


// await router.isReady()
router.isReady();
app.mount('#app')