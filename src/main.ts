import { createApp } from "vue";
import App from "./App.vue";

import i18next from 'i18next';
import I18NextVue from 'i18next-vue';

import en from './i18n/en';
import fr from "./i18n/fr";
import es from "./i18n/es";

function getUserLocale() {
    if (navigator.languages != undefined)
        return navigator.languages[0];
    return navigator.language;
}

const app = createApp(App);
i18next.init({
    lng: getUserLocale().substring(0, 2),
    fallbackLng: 'en',
    resources: {
        en, es, fr,
    }
});
app.use(I18NextVue, { i18next });
app.mount("#app");
