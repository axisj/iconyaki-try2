import PageRoute from "./router/PageRoute.tsx";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <PageRoute />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
