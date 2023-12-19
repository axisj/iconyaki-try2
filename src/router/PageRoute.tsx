import React from "react";
import { Route, Routes } from "react-router-dom";

const Error404 = React.lazy(() => import("../pages/error/Error404"));
const Home = React.lazy(() => import("../pages/home/App"));

function PageRoute() {
  React.useEffect(() => {}, []);

  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"*"} element={<Error404 />} />
    </Routes>
  );
}

export default PageRoute;
