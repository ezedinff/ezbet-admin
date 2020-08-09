import React from 'react';
import './App.less';
import {HashRouter as Router} from 'react-router-dom';
import {routes} from "./route";
import { BrowserRouter } from 'react-router-dom';
import {client} from "./apollo";



// lazy loading
/*const Home = React.lazy(() => import('app/containers/Home'));
const Dashboard = React.lazy(() => import('app/containers/Dashboard'));*/
function App() {
    return (
        <Router children={routes}/>
    );
}

export default App;
