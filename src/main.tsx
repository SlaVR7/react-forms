import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Main } from './pages/Main';
import ErrorPage from './pages/ErrorPage';
import { Uncontrolled } from './pages/Uncontrolled';
import { Controlled } from './pages/Controlled';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'uncontrolled',
    element: <Uncontrolled />,
  },
  {
    path: 'controlled',
    element: <Controlled />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
