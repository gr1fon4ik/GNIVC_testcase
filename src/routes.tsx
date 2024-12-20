import { LazyExoticComponent, ReactNode, lazy } from "react";

const Home = lazy(() => import("./pages/Home/Home"));

type TRoute = {
  name: string;
  path: string;
  Component: LazyExoticComponent<() => JSX.Element>;
  Fallback: ReactNode | null;
};

export const paths = {
  HOME: "/",
};

export const routes = [
  {
    name: "home",
    path: paths.HOME,
    Component: Home,
    Fallback: null,
  },
] as TRoute[];
