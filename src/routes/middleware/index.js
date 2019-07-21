import UserHasPermissions from './UserHasPermissions'
import RedirectIfAuthenticated from './RedirectIfAuthenticated'
import SetMetaTags from './SetMetaTags'

export default function middleware (router) {
    UserHasPermissions(router)
    RedirectIfAuthenticated(router)
    SetMetaTags(router)
}
