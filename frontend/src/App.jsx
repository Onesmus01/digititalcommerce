import React,{useEffect} from 'react'
import Home from './pages/Home.jsx'
import Header from '@/components/Header.jsx'
import Footer from '@/components/Footer.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '@/pages/Login.jsx'
import SignUp from '@/pages/SignUp.jsx'
import ForgotPassword from '@/pages/ForgotPassword.jsx'
import { Toaster } from "react-hot-toast";
import Context from '@/context/index.js'
import {useDispatch} from 'react-redux'
import { setUserDetails } from '../store/userSlice.js'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import AdminPanel from '@/pages/Adminpanel.jsx'
import AllProducts from '@/pages/AllProducts.jsx'
import AllUsers from '@/pages/AllUsers.jsx'
import Products from '@/pages/Product.jsx'

let backendUrl = import.meta.env.VITE_BACKEND_URL
const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

    const fetchUserDetails = async()=> {
      const dataResponse = await fetch(`${backendUrl}/user/user-details`,{
        method: "GET",
        credentials: "include"
      }
    )
    const response = await dataResponse.json()
    if(dataResponse.ok){
      dispatch(setUserDetails(response.data))
    }
    }

    useEffect(()=> {
      fetchUserDetails()
    },[])

    //logout session
    
  return (
    <Context.Provider value={{
      fetchUserDetails,navigate
    }} >
      <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Toaster position="top-center" />

      <Header />

      {/* Main content grows to take available space */}
      <main className="flex-1">
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/forgot-password'} element={<ForgotPassword />} />
          <Route path={'/sign-up'} element={<SignUp />} />
           
           {/* Admin routes */}
          <Route path={'admin-panel'} element={<AdminPanel />}>
          <Route path={'all-users'} element={<AllUsers />} />
          <Route path={'all-products'} element={<AllProducts />}/>
          <Route path={'product'} element={<Products />}/>


          </Route>

        </Routes>
      </main>

      {/* Footer sticks to the bottom */}
      <Footer />
    </div>

    </Context.Provider>
    
  )
}

export default App 