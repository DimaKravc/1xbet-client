import axios from 'axios'

export default {
    namespaced: true,

    state: {
        data: {}
    },

    actions: {
        me: ({ state, commit }) => {
            return axios.get('/user/me').then(res => {
                const { data = {} } = res

                commit('setData', data)

                return res
            })
        }
    },

    mutations: {
        setData: (state, data) => {
            state.data = Object.assign({}, state.data, data)
        }
    }
}
