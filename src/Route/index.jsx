import React, { Suspense } from "react";
import { AdminRoutes, PublicRoutes } from "./AppRoutes";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "../Pages/Admin/Auth/Login";



const ParentRoute = {
  superadmin: {
    routes: AdminRoutes,
  },
  // customer: {
  //   routes: ClientRoutes,
  // },
};

function Index() {
  const Admin_URL = process.env.REACT_APP_ADMINURL;
  const Public_URL = process.env.REACT_APP_PUBLICURL;

  console.log('pulic url ', Public_URL);
  console.log('admin url ', Admin_URL);

  console.log("public url matched", Admin_URL === window.location.origin);
  console.log("public url matched", Public_URL === window.location.origin);



  const { user, isAuthenticate } = useSelector((state) => state.auth);
  return (
    <Suspense fallback={<div>loading..</div>}>
      <Routes>
        {Public_URL === window.location.origin && PublicRoutes?.map((el) => {
          return (
            <Route path={el.path} element={<el.element />} key={el.path} />
          );
        })}
        {
          Admin_URL === window.location.origin && <Route path={'/'} element={<AdminLogin />} />
        },

        {/* Protected Routes */}
        {Admin_URL === window.location.origin && isAuthenticate &&
          user.role === "superadmin" &&
          ParentRoute[user.role].routes.map((el) => {
            return (
              <Route path={el.path} key={el.path} element={<el.element />} />
            );
          })}
      </Routes>
    </Suspense>
  );
}

export default Index;
