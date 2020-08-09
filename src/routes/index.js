import Day from '~/containers/Day';

let routes = [
    {
        name: 'home',
        url: '/',
        component: Day,
        exact: true
    },
    {
        name: 'day',
        url: '/:year/:month/:day',
        component: Day,
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