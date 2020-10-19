import React, { useEffect } from "react";
import "./App.less";
import { HashRouter as Router } from "react-router-dom";
import { routes } from "./route";

// lazy loading
/*const Home = React.lazy(() => import('app/containers/Home'));
const Dashboard = React.lazy(() => import('app/containers/Dashboard'));*/
// check if the user is authenticated,
function App() {
  return <Router children={routes} />;
}

export default App;
