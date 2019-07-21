<template>
    <section class="auth"
             @submit.prevent="handleSendCredentials">
        <form action="" class="auth-form">
            <div class="auth-form__primary">
                <header class="auth-form__header">
                    <h3 class="auth-form__title">Login</h3>
                    <p class="auth-form__subtitle">Sign in to your account to continue.</p>
                </header>
                <transition name="fade">
                    <div v-if="isShowInvalidMessage"
                         class="auth-form__invalid-messages-box">
                        {{ invalidMessage }}
                        <button type="button" class="close-me" @click.prevent="isShowInvalidMessage = false">x</button>
                    </div>
                </transition>
                <input-type-email ref="email"
                                  v-model="email"
                                  :disabled="state === 'SEND-CREDENTIALS'"
                                  :validation="email === null && state === 'VALIDATION'"/>
                <input-type-password ref="password"
                                     v-model="password"
                                     :disabled="state === 'SEND-CREDENTIALS'"
                                     :validation="password === null && state === 'VALIDATION'"/>
                <button class="button auth-form__control"
                        :disabled="state === 'SEND-CREDENTIALS'">Sign in
                </button>
            </div>
            <footer class="auth-form__footer">
                Not registered?
                <router-link :to="{name: 'signup', query: $store.state.route.query}">Create account</router-link>
            </footer>
        </form>
    </section>
</template>

<script>
    import { mapActions } from 'vuex'

    import InputTypeEmail from 'components/InputTypeEmail.vue'
    import InputTypePassword from 'components/InputTypePassword.vue'

    export default {
        components: {
            InputTypeEmail,
            InputTypePassword
        },

        data: () => ({
            state: 'FILL', // FILL, VALIDATION, SEND-CREDENTIALS

            email: null,
            password: null,

            invalidMessage: '',

            isShowInvalidMessage: false
        }),

        computed: {
            isReadyToSendCredentials () {
                const { email, password } = this
                return email !== null && password !== null
            }
        },

        methods: {
            ...mapActions('auth', {
                signinRequest: 'signin'
            }),

            handleSendCredentials () {
                if (this.isReadyToSendCredentials) {
                    const { email, password } = this

                    this.isShowInvalidMessage = false
                    this.state = 'SEND-CREDENTIALS'

                    this.signinRequest({ email, password }).then(() => {
                        this.$router.push({ name: 'summary' })
                    }).catch(err => {
                        const { response = {} } = err

                        if (response.hasOwnProperty('data') && typeof response.data === 'object') {
                            if (response.data.hasOwnProperty('error')) {
                                this.invalidMessage = response.data.error
                                this.isShowInvalidMessage = true
                            }
                        }

                        this.email = null
                        this.password = null

                        this.$refs.email.reset()
                        this.$refs.password.reset()

                        this.state = 'FILL'
                    })
                } else {
                    this.state = 'VALIDATION'
                }
            }
        }
    }
</script>
