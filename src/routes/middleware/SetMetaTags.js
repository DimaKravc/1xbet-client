export default router => {
    router.beforeEach((to, from, next) => {
        const nearestWithTitle = to.matched.slice().reverse().filter(obj => obj.hasOwnProperty('meta') && obj.meta.hasOwnProperty('title'))
        const nearestWithMeta = to.matched.slice().reverse().filter(obj => obj.hasOwnProperty('meta') && obj.meta.hasOwnProperty('metaTags'))

        if (nearestWithTitle.length) document.title = nearestWithTitle[0].meta.title

        Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

        if (!nearestWithMeta.length) return next()

        nearestWithMeta[0].meta.metaTags.map(tagDef => {
            const tag = document.createElement('meta')

            Object.keys(tagDef).forEach(key => {
                tag.setAttribute(key, tagDef[key])
            })

            tag.setAttribute('data-vue-router-controlled', '')

            return tag
        }).forEach(tag => document.head.appendChild(tag))

        next()
    })
}
