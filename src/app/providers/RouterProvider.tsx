import { createBrowserRouter, RouterProvider as 
ReactRouterProvider } from 'react-router-dom';
import {type FC} from 'react';
import BoardsPage from '../../pages/boards-page/ui/BoardsPage';
import BoardPage from '../../pages/board-page/ui/BoardPage';
import NotFoundPage from '../../pages/not-found-page/ui/NotFoundPage';
const router = createBrowserRouter([
{
  path:'/',
  element:<BoardsPage/>,
 },
 {
  path:'/boards/:id',
  element: <BoardPage/>
 },
 {
  path:'*',
  element: <NotFoundPage/>
 }
]);

export const  RouterProvider:FC = () => {
return <ReactRouterProvider router={router} />
};