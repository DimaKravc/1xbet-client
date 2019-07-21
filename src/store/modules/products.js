import axios from 'axios'

export default {
    namespaced: true,

    state: {
        list: [],

        meta: {
            pagination: {}
        },

        params: {
            page: 1,
            limit: 10,
            sortBy: '',
            order: 'asc'
        }
    },

    actions: {
        get: ({ state, commit }) => {
            return axios.get('/products', {
                params: state.params
            }).then(res => {
                const { data } = res

                commit('setData', data.products)
                commit('setMeta', data.meta)

                return res
            })
        },

        delete: ({ state }, id) => {
            return axios.delete('/products/', {
                params: {
                    id
                }
            })
        }
    },

    mutations: {
        setData: (state, products) => {
            state.list = [...products]
        },

        setMeta: (state, meta) => {
            state.meta = Object.assign({}, state.meta, meta)
        },

        setParams: (state, { key, value }) => {
            state.params[key] = value
        }
    }
}
