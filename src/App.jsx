import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AlertDocumentationPage from "./pages/AlertDocumentationPage";
import Root from "./pages/Root";
import Root2 from "./pages/Root2";
import ZoomContextProvider from "./store/ZoomContext";
import Login from "./pages/LoginForm/LoginForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Root />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forklift",
    element: <Root2 />,
  },
  {
    path: "/alert/:alertId",
    element: <AlertDocumentationPage />,
  },
]);

function App() {
  return (
    <ZoomContextProvider>
      <RouterProvider router={router} />
    </ZoomContextProvider>
  );
}

export default App;
