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
      className="sticky top-0 z-50 glass-nav shadow-sm border-b border-slate-100"
    >
      <div className="flex items-center justify-between px-5 sm:px-10 py-4 max-w-7xl mx-auto">
        
        {/* ✅ Animated CureLink Logo with Indian flag colors subtle representation */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/')}
          className="logo text-3xl font-extrabold tracking-tight cursor-pointer select-none flex items-center gap-1.5"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20">
            <span className="text-xl font-bold text-teal-50">+</span>
          </div>
          <div>
            <span className="text-[#0f766e]">Cure</span>
            <span className="text-[#f97316]">Link</span>
            <span className="text-[10px] block font-semibold text-slate-400 tracking-wider -mt-1.5">BHARAT CARE</span>
          </div>
        </motion.div>

        {/* ✅ Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 font-semibold text-slate-600 text-sm">
          {['/', '/doctors', '/about', '/contact'].map((path, i) => {
            const label = ['HOME', 'FIND DOCTORS', 'ABOUT US', 'CONTACT'][i]
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative py-1.5 transition-all duration-300 hover:text-primary tracking-wide ${
                    isActive ? 'text-primary' : ''
                  }`
                }
              >
                {label}
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 -bottom-1 h-[2px] bg-primary w-0 group-hover:w-full"
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
              <div className="flex items-center gap-2 cursor-pointer bg-slate-50 hover:bg-slate-100 py-1.5 px-3 rounded-full border border-slate-100 transition-colors">
                <img
                  className="w-7 h-7 rounded-full border border-primary/20 object-cover"
                  src={userData.image}
                  alt="user"
                />
                <span className="text-xs font-semibold text-slate-700 hidden sm:inline-block max-w-[80px] truncate">{userData.name}</span>
                <img className="w-3 opacity-60" src={assets.dropdown_icon} alt="dropdown" />
              </div>
              <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-xl p-2.5 w-52 hidden group-hover:block border border-slate-100 animate-fadeIn">
                <p
                  onClick={() => navigate('/my-profile')}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-teal-50 hover:text-primary rounded-lg cursor-pointer transition-colors"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate('/my-appointments')}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-teal-50 hover:text-primary rounded-lg cursor-pointer transition-colors"
                >
                  My Appointments
                </p>
                <div className="h-px bg-slate-100 my-1"></div>
                <p
                  onClick={logout}
                  className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-colors font-medium"
                >
                  Logout
                </p>
              </div>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/login')}
              className="bg-primary text-white px-6 py-2 rounded-full font-semibold text-sm shadow-md shadow-primary/10 hover:bg-teal-800 transition-all hidden md:block"
            >
              Sign In
            </motion.button>
          )}

          {/* ✅ Mobile Menu Icon */}
          <div 
            onClick={() => setShowMenu(true)}
            className="p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer md:hidden transition-colors border border-slate-100"
          >
            <img
              className="w-6"
              src={assets.menu_icon}
              alt="menu"
            />
          </div>
        </div>
      </div>

      {/* ✅ Mobile Navigation */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: showMenu ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 85, damping: 14 }}
        className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl z-50 md:hidden flex flex-col border-l border-slate-100"
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
          <div className="logo text-2xl font-extrabold tracking-tight cursor-pointer select-none flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white">
              <span className="text-lg font-bold">+</span>
            </div>
            <div>
              <span className="text-[#0f766e]">Cure</span>
              <span className="text-[#f97316]">Link</span>
            </div>
          </div>
          <div 
            onClick={() => setShowMenu(false)}
            className="p-1.5 rounded-full hover:bg-slate-100 cursor-pointer transition-colors border border-slate-100"
          >
            <img
              src={assets.cross_icon}
              className="w-5"
              alt="close"
            />
          </div>
        </div>

        <ul className="flex flex-col text-base font-semibold mt-6 px-6 gap-4 text-slate-700">
          {['/', '/doctors', '/about', '/contact'].map((path, i) => {
            const label = ['HOME', 'FIND DOCTORS', 'ABOUT US', 'CONTACT'][i]
            return (
              <NavLink
                key={path}
                onClick={() => setShowMenu(false)}
                to={path}
                className={({ isActive }) => 
                  `px-4 py-2.5 rounded-xl hover:bg-teal-50 hover:text-primary transition-colors ${
                    isActive ? 'bg-teal-50/50 text-primary' : ''
                  }`
                }
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
            className="mt-auto mx-6 mb-6 bg-primary text-white py-3 rounded-full font-semibold text-sm hover:bg-teal-800 transition shadow-lg shadow-primary/10"
          >
            Sign In
          </button>
        )}
      </motion.div>
    </motion.nav>
  )
}

export default Navbar
