import react from 'react';
import {
    BrowserRouter,
    Route,
    Link,
    Switch
} from "react-browser-router";
import Home from './components/home';

const App = ()=> (
  <BrowserRouter>

  <Route path="/" component={Home}/>


  </BrowserRouter>
)

