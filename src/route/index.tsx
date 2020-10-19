import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import {
  Dashboard,
  Sport,
  Country,
  League,
  Fixture,
  User,
  Advertisement,
  Transaction,
  Report,
  Setting,
  Market,
  Ticket,
} from "../pages";
import { PrivateLayout } from "../layouts/PrivateLayout";
import { FullPageLoader } from "../components/Loaders/FullPageLoader";
import { Shop } from "../pages/Shop";
import MakeTransaction from "../pages/Transaction/MakeTransaction";
import UserEdit from "../pages/User/UserEdit";
import AddShop from "../pages/Shop/AddAndEditShop";
import CreateAndEditAd from "../pages/Advertisement/CreateAndEditAd";

export const childRoutes = [
  {
    name: "Dashboard",
    icon: "dashboard",
    path: "/admin/dashboard",
    component: Dashboard,
  },
  {
    name: "Sports",
    icon: "skin",
    path: "/admin/sports",
    component: Sport,
  },
  {
    name: "Countries",
    icon: "flag",
    path: "/admin/countries",
    component: Country,
  },
  {
    name: "Leagues",
    icon: "safety-certificate",
    path: "/admin/leagues",
    component: League,
  },
  {
    name: "Fixtures",
    icon: "trophy",
    path: "/admin/fixtures",
    component: Fixture,
  },
  {
    name: "Users",
    icon: "user",
    path: "/admin/users",
    component: User,
  },
  {
    path: "/admin/users/:id",
    component: UserEdit,
  },
  {
    name: "Markets",
    icon: "shopping-cart",
    path: "/admin/markets",
    component: Market,
  },
  {
    name: "Advertisements",
    icon: "fund",
    path: "/admin/advertisements",
    component: Advertisement,
  },
  {
    path: "/admin/advertisements/:id",
    component: CreateAndEditAd,
  },
  {
    name: "Shops",
    icon: "home",
    path: "/admin/shops",
    component: Shop,
  },
  {
    path: "/admin/shops/:id",
    component: AddShop,
  },
  {
    name: "Transactions",
    icon: "shrink ",
    path: "/admin/transactions",
    component: Transaction,
  },
  {
    path: "/admin/maketransaction",
    component: MakeTransaction,
  },
  {
    name: "Reports",
    icon: "snippets",
    path: "/admin/reports",
    component: Report,
  },
  {
    name: "Tickets",
    icon: "container",
    path: "/admin/tickets",
    component: Ticket,
  },
  {
    name: "Settings",
    icon: "setting",
    path: "/admin/settings",
    component: Setting,
  },
];
const Home = React.lazy(() => import("../pages/Home"));
const PrimaryLayout = React.lazy(() => import("../layouts/primaryLayout"));
export const routes = (
  <Suspense fallback={<FullPageLoader />}>
    <Switch>
      <Route exact path={"/"}>
        <Home />
      </Route>
      <PrivateLayout path={"/admin"}>
        <PrimaryLayout />
      </PrivateLayout>
    </Switch>
  </Suspense>
);
