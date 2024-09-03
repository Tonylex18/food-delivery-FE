import './App.css'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/placeorder/PlaceOrder'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/verify/Verify'
import MyOrders from './pages/myOrders/MyOrders'

function App() {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin} />: <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
