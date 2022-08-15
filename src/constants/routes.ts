import { lazy } from "react";

type Route = {
  path: string;
  component: any;
};

const Home = lazy(() => import("pages/Home"));
const Admin = lazy(() => import("pages/Admin"));

const routes: Route[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/control",
    component: Admin,
  },
];

export default routes;
