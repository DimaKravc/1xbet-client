import axios from 'axios'

export default {
    namespaced: true,

    state: {},

    getters: {
        isAuthenticated: state => !!state.token
    },

    actions: {
        signup: ({ state }, credentials) => {
            return axios.post('/auth/signup', credentials)
                .then(res => {
                    const { data = {} } = res

                    if (data.hasOwnProperty('access_token')) {
                        localStorage.setItem('access_token', data['access_token'])
                    }

                    if (data.hasOwnProperty('refresh_token')) {
                        localStorage.setItem('refresh_token', data['refresh_token'])
                    }

                    return res
                })
        },

        signin: ({ commit }, credentials) => {
            return axios.post('/auth/signin', credentials)
                .then(
                    res => {
                        const { data = {} } = res

                        if (data.hasOwnProperty('access_token')) {
                            localStorage.setItem('access_token', data['access_token'])
                        }

                        if (data.hasOwnProperty('refresh_token')) {
                            localStorage.setItem('refresh_token', data['refresh_token'])
                        }

                        return res
                    })
        },

        refresh: ({ commit, dispatch }) => {
            return axios.post('/auth/refresh')
                .then(
                    res => {
                        const { data = {} } = res

                        if (data.hasOwnProperty('access_token')) {
                            localStorage.setItem('access_token', data['access_token'])
                        }

                        if (data.hasOwnProperty('refresh_token')) {
                            localStorage.setItem('refresh_token', data['refresh_token'])
                        }

                        return res
                    }
                )
                .catch(() => {
                    dispatch('signout')
                })
        },

        signout: () => {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            window.location = '/'
        }
    }
}
