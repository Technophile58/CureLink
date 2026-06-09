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
      className='flex bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-800 rounded-3xl px-6 sm:px-10 md:px-16 lg:px-20 my-16 overflow-hidden shadow-lg shadow-teal-900/10 relative'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Decorative vector background blur */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none -ml-20 -mt-20"></div>

      {/* ------- Left Side ------- */}
      <motion.div
        className='flex-1 py-10 sm:py-12 md:py-20 lg:py-24 z-10'
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight'>
          <p>Book Appointments</p>
          <p className='mt-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300'>With 100+ Verified Doctors</p>
        </div>
        <p className="text-slate-200 text-xs sm:text-sm mt-4 max-w-md font-medium leading-relaxed">
          Access specialized healthcare from anywhere. Sign up today and get your first digital health record created absolutely free.
        </p>

        <motion.button
          onClick={() => { navigate('/login'); scrollTo(0, 0) }}
          className='bg-[#f97316] text-white text-sm sm:text-base font-bold px-8 py-3 rounded-full mt-8 shadow-md hover:shadow-orange-500/20 hover:bg-orange-600 transition-all border border-orange-500/10'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Create Account
        </motion.button>
      </motion.div>

      {/* ------- Right Side ------- */}
      <motion.div
        className='hidden md:block md:w-1/2 lg:w-[350px] relative'
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.img
          className='w-full absolute bottom-0 right-0 max-w-md drop-shadow-2xl'
          src={assets.appointment_img}
          alt="Doctor Appointment"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  )
}

export default Banner
