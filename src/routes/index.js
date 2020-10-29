import Day from '~/containers/Day';
import Month from '~/containers/Month';
import Settings from '~/containers/Settings';
import Comments from '~/containers/Comments';
import UtzJobTypes from '~/containers/UtzJobTypes';
import DB from '~/containers/DB';
import Reports from '~/containers/Reports';
import ViewAll from '~/containers/Reports/ViewAll';

let routes = [
    {
        name: 'home',
        url: '/',
        component: Day,
        exact: true
    },
    {
        name: 'settings',
        url: '/settings',
        component: Settings,
        exact: true
    },
    {
        name: 'utzJobTypes',
        url: '/utzJobTypes',
        component: UtzJobTypes,
        exact: true
    },
    {
        name: 'comments',
        url: '/comments',
        component: Comments,
        exact: true
    },
    {
        name: 'db',
        url: '/db',
        component: DB,
        exact: true
    },
    {
        name: 'reports',
        url: '/reports',
        component: Reports,
        exact: true
    },
    {
        name: 'ViewAll',
        url: '/reports/ViewAll',
        component: ViewAll,
        exact: true
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
        component: Day
    }
];

let routesMap = {};

routes.forEach((route) => {
    if(route.hasOwnProperty('name')){
        routesMap[route.name] = route.url;
    }
});

let urlBuilder = function(name, params){
    if(!routesMap.hasOwnProperty(name)){
        return null;
    }

    let url = routesMap[name]; // news/:id

    for(let key in params){
        url = url.replace(':' + key, params[key]);
    }

    return url;
}

export default routes;
export {routesMap, urlBuilder};