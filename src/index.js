import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import EventDetails from './pages/EventDetails'
import Events from './pages/Events';
import { SearchProvider } from './SearchContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/events",
    element: <Events />
  },
  {
  path: "/events/:eventTitle",
  element: <EventDetails />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SearchProvider>
      <RouterProvider router={router} />
    </SearchProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
