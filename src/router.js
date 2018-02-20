import react from 'react';
import {
    Route,
    Link,
    Switch
} from "react-browser-router";
import Home from './components/home';

export default function Router() {
    return (
        <Switch>
            <Route path="/" component={Home}/>

        </Switch>
    )
}