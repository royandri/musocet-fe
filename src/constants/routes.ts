import { lazy } from "react";

type Route = {
  path: string;
  component: any;
};

const Application = lazy(() => import("Application"));
const Admin = lazy(() => import("pages/Admin"));

const routes: Route[] = [
  {
    path: "/",
    component: Application,
  },
  {
    path: "/secret-route",
    component: Admin,
  },
];

export default routes;
