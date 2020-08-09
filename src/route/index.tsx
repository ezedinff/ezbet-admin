import React, {Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import {
    Dashboard,
    Sport,
    Country,
    League,
    Fixture,
    User,
    Bet,
    Advertisement
} from "../pages";
import {PrivateLayout} from "../layouts/PrivateLayout";
import {FullPageLoader} from "../components/Loaders/FullPageLoader";

export const childRoutes = [
    {
        name: "Dashboard",
        icon: "dashboard",
        path: "/admin/dashboard",
        component: Dashboard
    },
    {
        name: "Sports",
        icon: "skin",
        path: "/admin/sports",
        component: Sport
    },
    {
        name: "Countries",
        icon: "flag",
        path: "/admin/countries",
        component: Country
    },
    {
        name: "Leagues",
        icon: "safety-certificate",
        path: "/admin/leagues",
        component: League
    },
    {
        name: "Fixtures",
        icon: "trophy",
        path: "/admin/fixtures",
        component: Fixture
    },
    {
        name: "Users",
        icon: "user",
        path: "/admin/users",
        component: User
    },
    {
        name: "Bets",
        icon: "shopping-cart",
        path: "/admin/bets",
        component: Bet
    },
    {
        name: "Advertisement",
        icon: "fund",
        path: "/admin/advertisements",
        component: Advertisement
    },

];
const Home = React.lazy(() => import('../pages/Home'));
const PrimaryLayout = React.lazy(() => import('../layouts/primaryLayout'));
export const routes = (
    <Suspense fallback={<FullPageLoader />}>
        <Switch>
            <Route exact path={'/'}>
                <Home />
            </Route>
            <PrivateLayout  path={'/admin'}>
                <PrimaryLayout/>
            </PrivateLayout>
        </Switch>
    </Suspense>
);