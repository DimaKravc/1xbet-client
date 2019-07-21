<template>
    <div>
        <div class="data-table-display">
            <div class="data-table-display__inner">
                <button class="data-table-display__button"
                        type="button"
                        @click.prevent="handleShowAllColumns">Display all
                </button>
                <button class="data-table-display__button"
                        type="button"
                        @click.prevent="isShowColumnsDisplayList = !isShowColumnsDisplayList">Display <span class="icon-arrow-bottom"></span></button>
                <transition name="fade">
                    <ul v-if="isShowColumnsDisplayList"
                        class="data-table-display__list">
                        <li v-for="(value, property, index) in cols" :key="index" class="data-table-display__item">
                            <input v-model="cols[property]"
                                   :id="property"
                                   :checked="value"
                                   type="checkbox">
                            <label :for="property">{{ property }}</label>
                        </li>
                    </ul>
                </transition>
            </div>
        </div>
        <div :class="['data-table', {'data-table_state_loading': loading}]">
            <div class="data-table__loader-wrap">
                <div class="data-table__header">
                    <div class="data-table__title">Products</div>
                </div>
                <table :class="['data-table__table', {'data-table__table_empty': !data.length}]">
                    <thead>
                    <tr>
                        <th v-if="value"
                            v-for="(value, property, index) in cols"
                            :key="index"
                            @click="handleSortAction(property)">
                            <div class="data-table__aligner">
                                {{ property }} <span :class="['icon-sort-indicator',
                            {'icon-sort-indicator_state_active-top': sortBy === property && order === 'desc'},
                            {'icon-sort-indicator_state_active-bottom': sortBy === property && order === 'asc'}]"></span>
                            </div>
                        </th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(value, property, index) in data" :key="index">
                        <td v-if="cols[property]"
                            v-for="(value, property, index) in value"
                            :key="index">{{ value }}
                        </td>
                        <td>
                            <button class="delete-me"
                                    type="button"
                                    @click.prevent="handleDeleteAction(value.id)"><span class="icon-trash"></span></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div v-if="!data.length"
                     class="data-table__empty">No data
                </div>
            </div>
            <transition name="fade">
                <span v-if="loading"
                      class="data-table__loader"></span>
            </transition>
        </div>
        <div class="data-table-utils">
            <div class="data-table-limit">
                <div class="data-table-limit__inner">
                    <button class="data-table-limit__button"
                            type="button"
                            @click.prevent="isShowLimitList = !isShowLimitList">{{ limit }} <span class="icon-arrow-bottom"></span></button>
                    <transition name="fade">
                        <ul v-if="isShowLimitList"
                            class="data-table-limit__list">
                            <li v-for="(l, index) in limits"
                                v-if="l <= pagination.total"
                                :key="index"
                                class="data-table-limit__item">
                                <button :class="['data-table-limit__l-button', {'data-table-limit__l-button_state_active': l === limit}]"
                                        type="button"
                                        @click.prevent="handleLimitAction(l)">{{ l }}
                                </button>
                            </li>
                        </ul>
                    </transition>
                </div>
            </div>
            <div class="data-table-pagination">
                <button v-for="p in pagination.total_pages"
                        :key=p
                        :class="['data-table-pagination__button', {'data-table-pagination__button_state_active': pagination.current_page === p}]"
                        type="button"
                        @click.prevent="handlePaginationAction(p)">{{ p }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                type: Array,
                required: true
            },

            pagination: {
                type: Object,
                required: true
            },

            limit: {
                type: Number,
                required: true
            },

            cols: {
                type: Object,
                required: true
            },

            loading: {
                type: Boolean,
                default: true
            },

            limits: {
                type: Array,
                default: () => [5, 10, 20, 50, 100]
            }
        },

        data: () => ({
            sortBy: null,
            order: 'asc',

            isShowColumnsDisplayList: false,
            isShowLimitList: false
        }),

        methods: {
            handleShowAllColumns () {
                for (let key in this.cols) {
                    this.cols[key] = true
                }

                this.isShowColumnsDisplayList = false
            },

            handleSortAction (sortKey) {
                let currentOrder = this['order']
                let currentKey = this['sortBy']
                let newOrder = 'asc'

                if (currentKey === sortKey) {
                    if (currentOrder === 'asc') {
                        newOrder = 'desc'
                    }
                }

                this.sortBy = sortKey
                this.order = newOrder

                this.$emit('sort', sortKey)
            },

            handleDeleteAction (id) {
                let isDelete = confirm('Are you sure to delete this item?')

                if (isDelete) {
                    this.$emit('delete', id)
                }
            },

            handleLimitAction (limit) {
                let { current_page: currentPage, total, total_pages: totalPages } = this.pagination
                let updatedTotalPage = Math.ceil(total / limit)

                if (currentPage !== 1 && updatedTotalPage < totalPages) {
                    this.$emit('pagination', updatedTotalPage, false)
                }

                this.$emit('limit', limit)
                this.isShowLimitList = false
            },

            handlePaginationAction (page) {
                this.$emit('pagination', page)
            }
        }
    }
</script>
