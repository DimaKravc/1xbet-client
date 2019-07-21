<template>
    <div>
        <site-header/>
        <div class="container">
            <data-table :data=data
                        :pagination=pagination
                        :limit=params.limit
                        :cols=cols
                        :loading="isFetchingData"
                        @sort="handleSort"
                        @delete="handleDelete"
                        @limit="handleLimit"
                        @pagination="handlePagination"/>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex'

    import SiteHeader from 'components/TheHeader.vue'
    import DataTable from 'components/DataTable.vue'

    export default {
        components: {
            SiteHeader,
            DataTable
        },

        data: () => ({
            cols: {
                id: true,
                product: true,
                calories: true,
                fat: true,
                carbs: true,
                protein: true,
                iron: true
            },

            isFetchingData: false
        }),

        computed: {
            ...mapState('products', {
                data: state => state.list,
                pagination: state => state.meta.pagination,
                params: state => state.params
            })
        },

        created () {
            if (!this.data.length) {
                this.isFetchingData = true
                this.getProductsRequest()
                    .finally(() => {
                        this.isFetchingData = false
                    })
            }
        },

        methods: {
            ...mapActions('products', {
                getProductsRequest: 'get',
                deleteProductsRequest: 'delete'
            }),

            ...mapMutations('products', ['setParams']),

            handleSort (sortKey, updateList = true) {
                let currentOrder = this.params['order']
                let currentKey = this.params['sortBy']
                let newOrder = 'asc'

                if (currentKey === sortKey) {
                    if (currentOrder === 'asc') {
                        newOrder = 'desc'
                    }
                }

                this.setParams({ key: 'sortBy', value: sortKey })
                this.setParams({ key: 'order', value: newOrder })

                if (updateList) {
                    this.isFetchingData = true
                    this.getProductsRequest()
                        .finally(() => {
                            this.isFetchingData = false
                        })
                }
            },

            handleDelete (index) {
                this.isFetchingData = true
                this.deleteProductsRequest(index)
                    .then(() => {
                        this.getProductsRequest()
                            .finally(() => {
                                this.isFetchingData = false
                            })
                    })
            },

            handleLimit (limit, updateList = true) {
                this.setParams({ key: 'limit', value: limit })

                if (updateList) {
                    this.isFetchingData = true
                    this.getProductsRequest()
                        .finally(() => {
                            this.isFetchingData = false
                        })
                }
            },

            handlePagination (page, updateList = true) {
                this.setParams({ key: 'page', value: page })

                if (updateList) {
                    this.isFetchingData = true
                    this.getProductsRequest()
                        .finally(() => {
                            this.isFetchingData = false
                        })
                }
            }
        }
    }
</script>
