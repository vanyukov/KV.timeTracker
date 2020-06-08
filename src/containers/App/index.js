import React from 'react';
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';

import withStore from '~/hocs/withStore';
import routes, { routesMap } from '~/routes';
import Header from '~/containers/Header'

class App extends React.Component{

    componentDidMount(){
        window.addEventListener("resize", this.props.stores.device.setSize);
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.props.stores.device.setSize);
    }

    render(){
        let routesComponents = routes.map((route) => {
            return <Route path={route.url}
                          component={route.component}
                          exact={route.exact}
                          key={route.url}
            />;
        });

        return (
            <>
                <Header />
                <Router>
                    <Switch>
                        {routesComponents}
                    </Switch>
                </Router>
            </>

        )
    }
}

export default withStore(App);