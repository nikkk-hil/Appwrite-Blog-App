import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        userData ? dispatch(login(userData)) : dispatch(logout());
      })
      .catch((error) => {
        dispatch(logout());
        console.error("Error fetching current user:", error);
      })
      .finally( () => {
        setLoading(false);
      })
  }, [])

return !loading ? (
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header />
      <main>
        <Outlet />
      </main> 
      <Footer />
    </div>
  </div>
) : (
  <div className='flex justify-center items-center'>
    <h1 className='text-2xl font-bold'>Loading...</h1>
  </div>
)

}

export default App;
