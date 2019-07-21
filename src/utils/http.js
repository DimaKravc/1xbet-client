import axios from 'axios'
import VueNotifications from 'vue-notifications'

import { store } from '../'

let isRefreshing = false
let refreshSubscribers = []

const addSubscriber = func => {
    refreshSubscribers.push(func)
}

const onRefreshed = () => {
    refreshSubscribers.map(fn => fn())
    refreshSubscribers = []
}

axios.defaults.timeout = 15000

export const setBaseUrl = url => {
    axios.defaults.baseURL = url
}

axios.interceptors.request.use(
    config => {
        let token = window.localStorage.getItem('access_token')

        if (/auth\/refresh/g.test(config.url)) {
            token = window.localStorage.getItem('refresh_token')
        }

        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }

        return config
    }
)

axios.interceptors.response.use(
    res => res,
    err => {
        if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx

            if (err.response.status === 401) {
                if (!isRefreshing) {
                    isRefreshing = true
                    store.dispatch('auth/refresh')
                        .then(() => {
                            isRefreshing = false
                            onRefreshed()
                        })
                }

                return new Promise(resolve => {
                    addSubscriber(() => {
                        resolve(axios(err.response.config))
                    })
                })
            }

            // Show notification with server error explanation

            if (err.response.status === 500 && err.response.data.length) {
                VueNotifications.error({
                    id: 'server-err',
                    message: err.response.data
                })
            }
        } else if (err.request) {
            // The request was made but no response was received
            // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js

            VueNotifications.error({
                id: 'server-err',
                message: 'Error on the server.'
            })
        } else {
            console.log('err', err.message)
        }

        return Promise.reject(err)
    })

export default axios
