export default [
    {
        path: '/',
        redirect: 'summary'
    },
    {
        path: '*',
        redirect: 'summary'
    },
    {
        path: '/auth',
        name: 'auth',
        component: require('pages/auth/index.vue').default,
        meta: {
            title: 'Enter'
        },
        children: [
            {
                path: 'signup',
                name: 'signup',
                meta: {
                    title: 'Sign up'
                }
            },
            {
                path: 'signin',
                name: 'signin',
                meta: {
                    title: 'Sign in'
                }
            }
        ]
    },
    {
        path: '/summary',
        name: 'summary',
        meta: {
            requiredPermission: true,
            title: '1xbet | Summary'
        },
        component: require('pages/summary/index.vue').default
    },
    {
        path: '/about-us',
        name: 'about-us',
        meta: {
            requiredPermission: true,
            title: '1xbet | About us'
        },
        component: require('pages/about-us/index.vue').default
    },
    {
        path: '/contacts',
        name: 'contacts',
        meta: {
            requiredPermission: true,
            title: '1xbet | Contacts'
        },
        component: require('pages/contacts/index.vue').default
    }
]
