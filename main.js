import Vue from 'vue'
import App from './App'

Vue.prototype.$requestUrl = 'http://samegame.ineinv.com/index.php/Home/';

import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
