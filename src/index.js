import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import { sync } from 'vuex-router-sync'

// axios setup
import { axios, setBaseUrl } from './utils/http'

// router setup
import routes from './routes/'
import middleware from './routes/middleware/'

// store setup
import stores from './store/stores'

import 'assets/styles/index.scss'

import App from './App.vue'

// notifications setup
import VueNotifications from 'vue-notifications'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
let toast = ({ ...params }) => {
    if (params.type === VueNotifications.types.warn) params.type = 'warning'

    let defaultParams = {
        position: 'topCenter',
        timeout: 3000,
        transitionIn: 'fadeInDown',
        toastOnce: true
    }

    return iziToast[params.type](Object.assign(defaultParams, params))
}

const options = {
    success: toast,
    error: toast,
    info: toast,
    warn: toast
}

// plugin setup
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueNotifications, options)

// configure store
export const store = new Vuex.Store({
    modules: stores,
    strict: process.env.NODE_ENV !== 'production'
})

// configure router
const router = new VueRouter({
    mode: 'history',
    routes
})
middleware(router)

sync(store, router)

setBaseUrl('https://pacific-citadel-42892.herokuapp.com/api')

/* eslint-disable no-new, no-unused-vars */
window.vm = new Vue({
    axios,
    store,
    router,
    render: h => h(App)
}).$mount('#root')
