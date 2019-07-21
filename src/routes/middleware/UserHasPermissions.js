export default router => {
    router.beforeEach((to, from, next) => {
        let token = window.localStorage.getItem('access_token')

        if (!token && to.meta.requiredPermission !== undefined) {
            next({ name: 'signup' })
        } else {
            next()
        }
    })
}
