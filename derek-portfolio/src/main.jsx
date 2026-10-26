import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx'
import Home from './pages/Home.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import NotFound from './pages/NotFound.jsx';
import './styles/globals.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/project/:slug",
        element: <ProjectDetail />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>,
)
