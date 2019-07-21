<template>
    <div class="container">
        <form-signin v-if="$store.state.route.name === 'signin'"/>
        <form-signup v-if="$store.state.route.name === 'signup'"/>
    </div>
</template>

<script>
    import FormSignin from './TheFormSignin.vue'
    import FormSignup from './TheFormSignup.vue'

    export default {
        components: {
            FormSignin,
            FormSignup
        }
    }
</script>
