// import React from 'react'
// import { assets } from '../assets/assets'

// const Header = () => {
//     return (
//         <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 '>

//             {/* --------- Header Left --------- */}
//             <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
//                 <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
//                     Book Appointment <br />  With Trusted Doctors
//                 </p>
//                 <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
//                     <img className='w-28' src={assets.group_profiles} alt="" />
//                     <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' /> schedule your appointment hassle-free.</p>
//                 </div>
//                 <a href='#speciality' className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#595959] text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
//                     Book appointment <img className='w-3' src={assets.arrow_icon} alt="" />
//                 </a>
//             </div>

//             {/* --------- Header Right --------- */}
//             <div className='md:w-1/2 relative'>
//                 <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
//             </div>
//         </div>
//     )
// }

// export default Header


import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Header = () => {
  const navigate = useNavigate()
  const [selectedCity, setSelectedCity] = useState('Bengaluru')
  const [selectedSpeciality, setSelectedSpeciality] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (selectedSpeciality) {
      navigate(`/doctors/${selectedSpeciality}`)
    } else {
      navigate('/doctors')
    }
    scrollTo(0, 0)
  }

  return (
    <motion.div
      className='relative flex flex-col lg:flex-row items-center bg-gradient-to-br from-teal-800 via-[#0e7490] to-emerald-800 rounded-3xl px-6 md:px-12 lg:px-20 py-12 md:py-16 my-8 overflow-hidden shadow-xl shadow-teal-900/10'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Decorative vector overlays */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20"></div>

      {/* --------- Header Left --------- */}
      <div className='w-full lg:w-3/5 flex flex-col items-start justify-center gap-6 z-10'>
        {/* Flag representation / Trust tag */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-semibold tracking-wide border border-white/10"
        >
          <span className="flex items-center gap-0.5">
            <span className="w-1.5 h-2.5 bg-[#FF9933] rounded-sm"></span>
            <span className="w-1.5 h-2.5 bg-white rounded-sm"></span>
            <span className="w-1.5 h-2.5 bg-[#128807] rounded-sm"></span>
          </span>
          India's Trusted Digital Care Network
        </motion.div>

        <motion.h1
          className='text-3xl md:text-4xl lg:text-5xl text-white font-extrabold leading-tight md:leading-tight lg:leading-snug'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Consult India's Top <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Verified Doctors</span> Online
        </motion.h1>

        <motion.div
          className='flex flex-col sm:flex-row items-center gap-3 text-teal-50 text-sm font-medium opacity-90'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <img
            className='w-24 drop-shadow-md'
            src={assets.group_profiles}
            alt='Group Profiles'
          />
          <p className="text-center sm:text-left leading-relaxed">
            Search verified specialists in your area. <br className='hidden sm:block' />
            Book instant appointments & consult top doctors today.
          </p>
        </motion.div>

        {/* --- Indian Search Console / Widget --- */}
        <motion.form 
          onSubmit={handleSearch}
          className="w-full max-w-xl bg-white p-3 rounded-2xl md:rounded-full shadow-lg shadow-teal-950/20 flex flex-col md:flex-row items-stretch md:items-center gap-2.5 mt-2 border border-slate-100"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {/* City select */}
          <div className="flex items-center gap-2 px-3 border-b md:border-b-0 md:border-r border-slate-100 pb-2.5 md:pb-0 md:w-[35%]">
            <span className="text-teal-600 font-semibold text-sm">📍</span>
            <select 
              value={selectedCity} 
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent text-slate-700 text-sm font-semibold focus:outline-none w-full cursor-pointer"
            >
              <option value="Bengaluru">Bengaluru</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>

          {/* Speciality select */}
          <div className="flex items-center gap-2 px-3 pb-2.5 md:pb-0 flex-1">
            <span className="text-teal-600 text-sm">🔍</span>
            <select
              value={selectedSpeciality}
              onChange={(e) => setSelectedSpeciality(e.target.value)}
              className="bg-transparent text-slate-600 text-sm focus:outline-none w-full cursor-pointer font-medium"
            >
              <option value="">Search Speciality (e.g. General physician)</option>
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-[#f97316] text-white px-7 py-2.5 md:py-3 rounded-xl md:rounded-full font-semibold text-sm hover:bg-orange-600 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20"
          >
            Search
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </motion.form>
      </div>

      {/* --------- Header Right --------- */}
      <div className='w-full lg:w-2/5 relative mt-8 lg:mt-0 flex justify-center z-10'>
        <motion.div
          className="relative max-w-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img
            className='w-full h-auto drop-shadow-2xl'
            src={assets.header_img}
            alt='Header Illustration'
          />
          {/* Subtle trust badge card floating */}
          <motion.div 
            className="absolute -bottom-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-slate-100"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-lg">✓</div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">MCI Registered</p>
              <p className="text-xs text-slate-700 font-bold">100% Verified Doctors</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Header
