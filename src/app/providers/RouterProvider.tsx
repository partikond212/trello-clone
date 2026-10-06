import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";
import { type FC } from "react";
import BoardsPage from "../../pages/boards-page/ui/BoardsPage";
import BoardPage from "../../pages/board-page/ui/BoardPage";
import NotFoundPage from "../../pages/not-found-page/ui/NotFoundPage";
import CardPage from "@/pages/card-page/CardPage";
import AuthPage from "@/pages/auth-page/ui/AuthPage";
import ProtectedRoute from "./ProtectedRoute";
import UserProfile from "@/entities/user/ui/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BoardsPage />,
  },
  {
    path: "/boards/:id",
    element: <BoardPage />,
  },
  {
    path: "/cards/:id",
    element: <CardPage />,
  },
  {
    path: "/user/auth",
    element: <AuthPage />,
  },
  {
    path: "/user/me",
    element: <ProtectedRoute children={<UserProfile />} />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export const RouterProvider: FC = () => {
  return <ReactRouterProvider router={router} />;
};
