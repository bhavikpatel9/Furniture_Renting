import { useState, useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile';
import AllFurniture from './pages/AllFurniture';
import allFurniture from './mockData/AllFurnitureData';
import Home from './components/Home';
import FurnitureDetails from './pages/FurnitureDetails';
import PopularFurniture from './components/PopularFurniture';
import popularFurniture from './mockData/PopularFurnitureData';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Check local storage for saved login state
    const savedUserName = localStorage.getItem('userName');
    if (savedUserName) {
      setUserName(savedUserName);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (name, id, accessToken, userType, email) => {
    setUserName(name);
    setEmail(email)
    setIsLoggedIn(true);
    if(userType === 'ADMIN'){
      setIsAdmin(true);
    }
    localStorage.setItem('userName', name); // Save username to local storage
    localStorage.setItem('email', email); // Save email to local storage
    localStorage.setItem('token', accessToken); // Save token to local storage
  };

  const handleLogout = () => {
    setUserName('');
    setIsLoggedIn(false);
    localStorage.removeItem('userName'); // Remove username from local storage
    localStorage.removeItem('token'); // Remove username from local storage
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Navbar isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} />
          <Home imageHeight="h-[500px]" />
          <PopularFurniture popularFurniture={popularFurniture}/>
        </>
      ),
    },
    {
      path: '/allfurniture',
      element: (
        <>
          <Navbar isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} />
          <AllFurniture allFurniture={allFurniture}/>
        </>
      ),
    },
    {
      path: '/furnituredetails/:id',
      element: (
        <>
          <Navbar isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} />
          <FurnitureDetails allFurniture={allFurniture} isLoggedIn={isLoggedIn}/>
        </>
      ),
    },
    {
      path: '/signup',
      element: (
        <>
          <Navbar isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} />
          <Signup onLogin={handleLogin}/>
        </>
      ),
    },
    {
      path: '/login',
      element: (
        <>
          <Navbar isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} />
          <Login onLogin={handleLogin} />
        </>
      ),
    },
    {
      path: '/profile',
      element: (
        <>
          <Navbar isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} />
          <Profile email={email}/>
        </>
      ),
    },
  ]);


  return (
    <>
       <RouterProvider router={router} />
    </>
  )
}

export default App
