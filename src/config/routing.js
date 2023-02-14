import { lazy } from "react";
import { Route, Navigate } from "react-router-dom";

export const ProtectedRoute = ({ user, redirectPath = "/login", children }) => {
  if (!user) {
    return <Navigate to={redirectPath} />;
  }
  return children;
};

export const Navigation = lazy(() => import("../components/pages/Navigation"));
const Login = lazy(() => import("../components/pages/Login"));
const Main = lazy(() => import("../components/pages/Main"));
const NewWords = lazy(() => import("../components/pages/NewWords"));
const Daily = lazy(() => import("../components/pages/Daily"));
const History = lazy(() => import("../components/pages/History"));
const HowToUse = lazy(() => import("../components/pages/HowToUse"));

export const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: Main,
  },
  {
    path: "/new",
    component: NewWords,
  },
  {
    path: "/daily",
    component: Daily,
  },
  {
    path: "/history",
    component: History,
  },
  {
    path: "/how-to-use",
    component: HowToUse,
  },
];

export const renderRoutes = (isProtected) => {
  return routes.map((route, index) => {
    return index === 0 ? (
      <Route key={index} path={route.path} element={<route.component />} />
    ) : (
      <Route
        key={index}
        path={route.path}
        element={
          <ProtectedRoute user={isProtected}>
            <route.component />
          </ProtectedRoute>
        }
      />
    );
  });
};
