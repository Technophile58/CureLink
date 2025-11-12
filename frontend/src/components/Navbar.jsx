// import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
// import { NavLink, useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'

// const Navbar = () => {

//   const navigate = useNavigate()

//   const [showMenu, setShowMenu] = useState(false)
//   const { token, setToken, userData } = useContext(AppContext)

//   const logout = () => {
//     localStorage.removeItem('token')
//     setToken(false)
//     navigate('/login')
//   }

//   return (
//     <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]'>
//       {/* <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" /> */}
//    <div className="logo text-3xl font-extrabold text-blue-600 tracking-wide">
//   Cure<span className="text-green-500">Link</span>
// </div>


//       <ul className='md:flex items-start gap-5 font-medium hidden'>
//         <NavLink to='/' >
//           <li className='py-1'>HOME</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to='/doctors' >
//           <li className='py-1'>ALL DOCTORS</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to='/about' >
//           <li className='py-1'>ABOUT</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to='/contact' >
//           <li className='py-1'>CONTACT</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//         </NavLink>
//       </ul>

//       <div className='flex items-center gap-4 '>
//         {
//           token && userData
//             ? <div className='flex items-center gap-2 cursor-pointer group relative'>
//               <img className='w-8 rounded-full' src={userData.image} alt="" />
//               <img className='w-2.5' src={assets.dropdown_icon} alt="" />
//               <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
//                 <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4'>
//                   <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
//                   <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
//                   <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
//                 </div>
//               </div>
//             </div>
//             : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
//         }
//         <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

//         {/* ---- Mobile Menu ---- */}
//         <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
//           <div className='flex items-center justify-between px-5 py-6'>
//             <img src={assets.logo} className='w-36' alt="" />
//             <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7' alt="" />
//           </div>
//           <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
//             <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded full inline-block'>HOME</p></NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-4 py-2 rounded full inline-block'>ALL DOCTORS</p></NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-4 py-2 rounded full inline-block'>ABOUT</p></NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-4 py-2 rounded full inline-block'>CONTACT</p></NavLink>
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar


import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200"
    >
      <div className="flex items-center justify-between px-5 sm:px-10 py-4">
        
        {/* ✅ Animated CureLink Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/')}
          className="logo text-3xl font-extrabold tracking-wide cursor-pointer select-none"
        >
          <span className="text-blue-600">Cure</span>
          <span className="text-green-500">Link</span>
        </motion.div>

        {/* ✅ Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          {['/', '/doctors', '/about', '/contact'].map((path, i) => {
            const label = ['HOME', 'ALL DOCTORS', 'ABOUT', 'CONTACT'][i]
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative transition-all duration-300 hover:text-blue-600 ${
                    isActive ? 'text-blue-600' : ''
                  }`
                }
              >
                {label}
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 -bottom-1 h-[2px] bg-blue-500 w-0 group-hover:w-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </NavLink>
            )
          })}
        </ul>

        {/* ✅ Right Side (Profile / Login Button / Mobile Menu) */}
        <div className="flex items-center gap-5">
          {token && userData ? (
            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  className="w-9 h-9 rounded-full border border-gray-300 object-cover"
                  src={userData.image}
                  alt="user"
                />
                <img className="w-3" src={assets.dropdown_icon} alt="dropdown" />
              </div>
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-3 w-48 hidden group-hover:block">
                <p
                  onClick={() => navigate('/my-profile')}
                  className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate('/my-appointments')}
                  className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer text-red-500"
                >
                  Logout
                </p>
              </div>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium shadow-sm hover:bg-blue-700 transition-all hidden md:block"
            >
              Create Account
            </motion.button>
          )}

          {/* ✅ Mobile Menu Icon */}
          <img
            onClick={() => setShowMenu(true)}
            className="w-7 cursor-pointer md:hidden"
            src={assets.menu_icon}
            alt="menu"
          />
        </div>
      </div>

      {/* ✅ Mobile Navigation */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: showMenu ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 70, damping: 12 }}
        className="fixed top-0 right-0 h-full w-[75%] bg-white shadow-2xl z-50 md:hidden flex flex-col"
      >
        <div className="flex justify-between items-center px-6 py-5 border-b">
          <h2 className="text-2xl font-bold text-blue-600">Cure<span className="text-green-500">Link</span></h2>
          <img
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            className="w-6 cursor-pointer"
            alt="close"
          />
        </div>

        <ul className="flex flex-col text-lg font-medium mt-6 px-6 gap-4">
          {['/', '/doctors', '/about', '/contact'].map((path, i) => {
            const label = ['HOME', 'ALL DOCTORS', 'ABOUT', 'CONTACT'][i]
            return (
              <NavLink
                key={path}
                onClick={() => setShowMenu(false)}
                to={path}
                className="hover:text-blue-600 transition-colors"
              >
                {label}
              </NavLink>
            )
          })}
        </ul>

        {!token && (
          <button
            onClick={() => {
              navigate('/login')
              setShowMenu(false)
            }}
            className="mt-auto mx-6 mb-6 bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        )}
      </motion.div>
    </motion.nav>
  )
}

export default Navbar
