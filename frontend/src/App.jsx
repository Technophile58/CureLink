// import React from 'react'
// import Navbar from './components/Navbar'
// import { Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
// import Doctors from './pages/Doctors'
// import Login from './pages/Login'
// import About from './pages/About'
// import Contact from './pages/Contact'
// import Appointment from './pages/Appointment'
// import MyAppointments from './pages/MyAppointments'
// import MyProfile from './pages/MyProfile'
// import Footer from './components/Footer'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Verify from './pages/Verify'

// const App = () => {
//   return (
//     <div className='mx-4 sm:mx-[10%]'>
//       <ToastContainer />
//       <Navbar />
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/doctors' element={<Doctors />} />
//         <Route path='/doctors/:speciality' element={<Doctors />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/about' element={<About />} />
//         <Route path='/contact' element={<Contact />} />
//         <Route path='/appointment/:docId' element={<Appointment />} />
//         <Route path='/my-appointments' element={<MyAppointments />} />
//         <Route path='/my-profile' element={<MyProfile />} />
//         <Route path='/verify' element={<Verify />} />
//       </Routes>
//       <Footer />
//     </div>
//   )
// }

// export default App



import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Verify from './pages/Verify'
import { AnimatePresence, motion } from 'framer-motion'  // ✅ import Framer Motion

const App = () => {
  const location = useLocation()

  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />

      {/* ✅ Animate route transitions */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<PageWrapper><Home /></PageWrapper>} />
          <Route path='/doctors' element={<PageWrapper><Doctors /></PageWrapper>} />
          <Route path='/doctors/:speciality' element={<PageWrapper><Doctors /></PageWrapper>} />
          <Route path='/login' element={<PageWrapper><Login /></PageWrapper>} />
          <Route path='/about' element={<PageWrapper><About /></PageWrapper>} />
          <Route path='/contact' element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path='/appointment/:docId' element={<PageWrapper><Appointment /></PageWrapper>} />
          <Route path='/my-appointments' element={<PageWrapper><MyAppointments /></PageWrapper>} />
          <Route path='/my-profile' element={<PageWrapper><MyProfile /></PageWrapper>} />
          <Route path='/verify' element={<PageWrapper><Verify /></PageWrapper>} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  )
}

/* ✅ Reusable animation wrapper for smooth page transitions */
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
)

export default App
