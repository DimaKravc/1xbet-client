<template>
    <section class="auth"
             @submit.prevent="handleSendCredentials">
        <form action="" class="auth-form">
            <div class="auth-form__primary">
                <header class="auth-form__header">
                    <h3 class="auth-form__title">Create account</h3>
                    <p class="auth-form__subtitle">Made with love by developers for developers.</p>
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
                <input-type-text ref="username"
                                 v-model="username"
                                 label="Username"
                                 placeholder="Bradley Cooper"
                                 invalid-message="Enter your username"
                                 :disabled="state === 'SEND-CREDENTIALS'"
                                 :validation="username === null && state === 'VALIDATION'"/>
                <input-type-password ref="password"
                                     v-model="password"
                                     :complexity="true"
                                     :disabled="state === 'SEND-CREDENTIALS'"
                                     :validation="password === null && state === 'VALIDATION'"/>
                <button class="button auth-form__control"
                        :disabled="state === 'SEND-CREDENTIALS'">Create my account
                </button>
            </div>
            <footer class="auth-form__footer">
                Already have an account?
                <router-link :to="{name: 'signin', query: $store.state.route.query}">Sign in</router-link>
            </footer>
        </form>
    </section>
</template>

<script>
    import { mapActions } from 'vuex'

    import InputTypeText from 'components/InputTypeText.vue'
    import InputTypeEmail from 'components/InputTypeEmail.vue'
    import InputTypePassword from 'components/InputTypePassword.vue'

    export default {
        components: {
            InputTypeText,
            InputTypeEmail,
            InputTypePassword
        },

        data: () => ({
            state: 'FILL', // FILL, VALIDATION, SEND-CREDENTIALS

            email: null,
            username: null,
            password: null,

            invalidMessage: '',

            isShowInvalidMessage: false
        }),

        computed: {
            isReadyToSendCredentials () {
                const { email, username, password } = this
                return email !== null && username !== null && password !== null
            }
        },

        methods: {
            ...mapActions('auth', {
                signupRequest: 'signup'
            }),

            handleSendCredentials () {
                if (this.isReadyToSendCredentials) {
                    const { email, username, password } = this

                    this.isShowInvalidMessage = false
                    this.state = 'SEND-CREDENTIALS'

                    this.signupRequest({ email, username, password }).then(() => {
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
                        this.username = null
                        this.password = null

                        this.$refs.email.reset()
                        this.$refs.username.reset()
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
