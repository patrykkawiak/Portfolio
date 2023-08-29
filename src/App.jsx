import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage, { homeAction, homeLoader } from "./pages/Home";
import Admin, { adminLoader } from "./pages/Admin";
import Login from "./components/auth/Login";
import ProjectsAdmin, {
  projectAction,
  projectLoader,
} from "./pages/ProjectsAdmin";
import AdminLayout from "./components/admin/AdminLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    action: homeAction,
    loader: homeLoader,
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Admin />, loader: adminLoader },
      {
        path: "projects",
        element: <ProjectsAdmin />,
        action: projectAction,
        loader: projectLoader,
      },
    ],
  },
  { path: "login", element: <Login /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
