import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Components/Home/Home.jsx'
import Login from './Components/Auth/Login.jsx'
import Register from './Components/Auth/Register.jsx'
import Profile from './Components/Profile/Profile.jsx';
import AddBlog from './Components/AddBlog/AddBlog.jsx';
import Blog from './Components/Blog/Blog.jsx';
import Update from './Components/Update/Update.jsx';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ProtectedRouter from './Components/ProtectedRouter/ProtectedRouter.jsx';

function App() {
  const [userData, setUserdata] = useState(null)

  function dataUser() {
    let token = localStorage.getItem('userToken');
    let userData = jwtDecode(token);
    setUserdata(userData)
    localStorage.setItem("userId", userData.userId)
  }


  const router = createBrowserRouter([
    {
      path: "/home",
      element: <Home />
    },
    {
      path: "/",
      element: <Login dataUser={dataUser} />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "profile",
      element: <ProtectedRouter><Profile userData={userData} /></ProtectedRouter>,
    },
    {
      path: "addblog",
      element: <ProtectedRouter> <AddBlog userData={userData} /></ProtectedRouter>,
    },
    {
      path: "blog/:id",
      element: <ProtectedRouter> <Blog /></ProtectedRouter>,
    },
    {
      path: "update/:id",
      element: <ProtectedRouter><Update /></ProtectedRouter>,
    },

  ]);

  return (
    <>

      <RouterProvider router={router} />
    </>
  )
}

export default App
