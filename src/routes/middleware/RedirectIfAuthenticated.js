export default router => {
    router.beforeEach((to, from, next) => {
        let token = window.localStorage.getItem('access_token')

        if (token && (to.name === 'signup' || to.name === 'signin')) {
            next({ name: 'summary' })
        } else {
            next()
        }
    })
}
