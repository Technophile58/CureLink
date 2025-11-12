// import React, { useContext } from 'react'
// import { assets } from '../assets/assets'
// import { DoctorContext } from '../context/DoctorContext'
// import { AdminContext } from '../context/AdminContext'
// import { useNavigate } from 'react-router-dom'

// const Navbar = () => {

//   const { dToken, setDToken } = useContext(DoctorContext)
//   const { aToken, setAToken } = useContext(AdminContext)

//   const navigate = useNavigate()

//   const logout = () => {
//     navigate('/')
//     dToken && setDToken('')
//     dToken && localStorage.removeItem('dToken')
//     aToken && setAToken('')
//     aToken && localStorage.removeItem('aToken')
//   }

//   return (
//     <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
//       <div className='flex items-center gap-2 text-xs'>
//         <img onClick={() => navigate('/')} className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
//         <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
//       </div>
//       <button onClick={() => logout()} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
//     </div>
//   )
// }

// export default Navbar


import React, { useContext } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    if (dToken) {
      setDToken('')
      localStorage.removeItem('dToken')
    }
    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white shadow-sm'>
      
      {/* CureLink Text Logo */}
      <div 
        onClick={() => navigate('/')} 
        className='flex items-center gap-2 cursor-pointer select-none'
      >
        <h1 className='text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400 tracking-wide'>
          CureLink
        </h1>
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 text-xs'>
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>

      {/* Logout Button */}
      <button 
        onClick={logout} 
        className='bg-gradient-to-r from-blue-600 to-teal-400 text-white text-sm px-8 py-2 rounded-full hover:opacity-90 transition-all duration-300'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
