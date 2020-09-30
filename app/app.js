import Vue from "nativescript-vue";

import {
    Application as application,
} from '@nativescript/core';

import RadListView from 'nativescript-ui-listview/vue';

import * as imageModule from '@nativescript-community/ui-image';
import ImagePlugin from '@nativescript-community/ui-image/vue';

import Home from "./components/Home";

Vue.use(ImagePlugin);
Vue.use(RadListView);

application.on(application.launchEvent, () => {
    imageModule.initialize({ isDownsampleEnabled: true });

    imageModule.getImagePipeline().clearCaches();
});

application.on(application.exitEvent, () => imageModule.shutDown());

new Vue({
    render: h => h('frame', [h(Home)]),
}).$start();
