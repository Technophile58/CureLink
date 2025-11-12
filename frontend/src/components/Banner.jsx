// import React from 'react'
// import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'

// const Banner = () => {

//     const navigate = useNavigate()

//     return (
//         <div className='flex bg-primary rounded-lg  px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>

//             {/* ------- Left Side ------- */}
//             <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
//                 <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
//                     <p>Book Appointment</p>
//                     <p className='mt-4'>With 100+ Trusted Doctors</p>
//                 </div>
//                 <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className='bg-white text-sm sm:text-base text-[#595959] px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all '>Create account</button>
//             </div>

//             {/* ------- Right Side ------- */}
//             <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
//                 <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
//             </div>
//         </div>
//     )
// }

// export default Banner


import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion' // ✅ Import Framer Motion

const Banner = () => {
  const navigate = useNavigate()

  return (
    <motion.div
      className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 overflow-hidden'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* ------- Left Side ------- */}
      <motion.div
        className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white leading-tight'>
          <p>Book Appointment</p>
          <p className='mt-4'>With 100+ Trusted Doctors</p>
        </div>

        <motion.button
          onClick={() => { navigate('/login'); scrollTo(0, 0) }}
          className='bg-white text-sm sm:text-base text-[#595959] px-8 py-3 rounded-full mt-6 shadow-md hover:shadow-lg hover:scale-105 transition-all'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Create account
        </motion.button>
      </motion.div>

      {/* ------- Right Side ------- */}
      <motion.div
        className='hidden md:block md:w-1/2 lg:w-[370px] relative'
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <motion.img
          className='w-full absolute bottom-0 right-0 max-w-md drop-shadow-lg'
          src={assets.appointment_img}
          alt="Doctor Appointment"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  )
}

export default Banner
