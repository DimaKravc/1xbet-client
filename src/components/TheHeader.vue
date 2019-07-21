<template>
    <header class="site-header">
        <div class="container">
            <div class="site-header__inner">
                <div class="site-header__col site-header__col_align_left">
                    <div class="user">
                        <span class="user__avatar" :style="`background-image: url('${user.data.avatar}')`"></span>
                        <strong class="user__name">{{ user.data.username }}</strong>
                    </div>
                </div>
                <div class="site-header__col site-header__col_align_center">
                    <nav class="site-nav">
                        <ul class="site-nav__list">
                            <li class="site-nav__item">
                                <router-link :to="{name: 'summary', query: $store.state.route.query}">Summary</router-link>
                            </li>
                            <li class="site-nav__item">
                                <router-link :to="{name: 'about-us', query: $store.state.route.query}">About us</router-link>
                            </li>
                            <li class="site-nav__item">
                                <router-link :to="{name: 'contacts', query: $store.state.route.query}">Contacts</router-link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="site-header__col site-header__col_align_right">
                    <button class="button" @click.prevent="signoutRequest">Sign out</button>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        created () {
            this.meRequest()
        },

        computed: {
            ...mapState('user', {
                user: state => state
            })
        },

        methods: {
            ...mapActions('user', {
                meRequest: 'me'
            }),

            ...mapActions('auth', {
                signoutRequest: 'signout'
            })
        }
    }
</script>
