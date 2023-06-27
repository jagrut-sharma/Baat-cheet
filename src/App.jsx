import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";
import Liked from "./pages/Liked";
import Authentication from "./pages/Authentication";
import RequireAuth from "./components/RequireAuth";
import ProfileRootLayout from "./pages/ProfileRootLayout";
import GuestProfile from "./pages/GuestProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <RootLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/bookmarks",
        element: <Bookmarks />,
      },
      {
        path: "/liked",
        element: <Liked />,
      },
      {
        path: "/profile",
        element: <ProfileRootLayout />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: ":userID",
            element: <GuestProfile />,
          },
        ],
      },
    ],
  },
  {
    path: "auth",
    element: <Authentication />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        transition={Slide}
        pauseOnFocusLoss={false}
        className={"font-Poppins font-bold"}
      />
    </>
  );
}

export default App;
