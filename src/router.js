import React from 'react';
import {
    Route,
    Link,
    Switch
} from "react-browser-router";
import Home from './components/home/home';
import Dashboard from './components/dashboard/dashboard';
import Inventory from './components/inventory/inventory';
import Shop from './components/shop/shop';

export default function Router() {
    return (

            <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/inventory" component={Inventory} />
                <Route path="/shop" component={Shop} />
            </Switch>

    )
}