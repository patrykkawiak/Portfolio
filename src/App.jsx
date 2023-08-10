import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage, { homeAction } from "./pages/Home";
import Admin, { adminLoader } from "./pages/Admin";
import Login from "./components/auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    action: homeAction,
  },
  { path: "admin", element: <Admin />, loader: adminLoader },
  { path: "login", element: <Login /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
