import Day from '~/pages/Day'
import Month from '~/pages/Month'
import Settings from '~/pages/Settings'
import Comments from '~/pages/Comments'
import Clients from '~/pages/Clients'
import ClientSites from '~/pages/ClientSites'
import UtzJobTypes from '~/pages/UtzJobTypes'
import DB from '~/pages/DB'
import Reports from '~/pages/Reports'
import ViewAll from '~/pages/Reports/ViewAll'

let routes = [
  {
    name: 'home',
    url: '/',
    component: Day,
    exact: true,
  },
  {
    name: 'settings',
    url: '/settings',
    component: Settings,
    exact: true,
  },
  {
    name: 'utzJobTypes',
    url: '/utzJobTypes',
    component: UtzJobTypes,
    exact: true,
  },
  {
    name: 'comments',
    url: '/comments',
    component: Comments,
    exact: true,
  },
  {
    name: 'clients',
    url: '/clients',
    component: Clients,
    exact: true,
  },
  {
    name: 'clientSites',
    url: '/clientSites',
    component: ClientSites,
    exact: true,
  },
  {
    name: 'db',
    url: '/db',
    component: DB,
    exact: true,
  },
  {
    name: 'reports',
    url: '/reports',
    component: Reports,
    exact: true,
  },
  {
    name: 'ViewAll',
    url: '/reports/ViewAll',
    component: ViewAll,
    exact: true,
  },
  {
    name: 'day',
    url: '/:year/:month/:day',
    component: Day,
  },
  {
    name: 'day',
    url: '/:year/:month',
    component: Month,
  },
  {
    url: '**',
    component: Day,
  },
]

let routesMap = {}

routes.forEach((route) => {
  if (route.hasOwnProperty('name')) {
    routesMap[route.name] = route.url
  }
})

let urlBuilder = function (name, params) {
  if (!routesMap.hasOwnProperty(name)) {
    return null
  }

  let url = routesMap[name] // news/:id

  for (let key in params) {
    url = url.replace(':' + key, params[key])
  }

  return url
}

export default routes
export { routesMap, urlBuilder }
