import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors, currencySymbol } = useContext(AppContext)

  // Generate a mock rating based on doctor name length to keep it deterministic but varied
  const getMockRating = (name) => {
    const score = 4 + (name.length % 10) * 0.1
    const stories = 45 + (name.length * 7)
    return {
      stars: score.toFixed(1),
      count: stories
    }
  }

  return (
    <div className='flex flex-col items-center gap-6 my-16 text-slate-800 max-w-7xl mx-auto px-4'>
      <h2 className='text-3xl font-extrabold text-[#0f766e] tracking-tight text-center'>
        Top Rated Doctors in India
      </h2>
      <p className='sm:w-1/2 text-center text-sm text-slate-500 font-medium leading-relaxed'>
        Connect with highly qualified, certified medical specialists. Read verified patient reviews and book slots.
      </p>

      {/* Grid wrapper */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-6'>
        {doctors.slice(0, 10).map((item, index) => {
          const rating = getMockRating(item.name)
          return (
            <motion.div 
              key={index}
              onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
              className='bg-white border border-slate-100 rounded-2xl overflow-hidden cursor-pointer hover:border-teal-300 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group'
              whileHover={{ y: -6 }}
            >
              {/* Image Container */}
              <div className='relative bg-slate-50/80 overflow-hidden aspect-[4/3] flex items-center justify-center'>
                <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name} />
                
                {/* Available Status Pill */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                  <span className={`relative flex h-2 w-2`}>
                    {item.available && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${item.available ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                  </span>
                  <span className={`text-[10px] font-bold ${item.available ? 'text-emerald-600' : 'text-slate-500'}`}>
                    {item.available ? 'Available' : 'Busy'}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded-lg flex items-center gap-1 text-[10px] font-semibold">
                  <span className="text-amber-400">★</span>
                  <span>{rating.stars}</span>
                  <span className="text-slate-300 font-normal">({rating.count})</span>
                </div>
              </div>

              {/* Card Details */}
              <div className='p-4 flex-1 flex flex-col justify-between'>
                <div>
                  <div className='flex items-center gap-1 mb-1'>
                    <span className="text-[10px] bg-teal-50 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      {item.speciality}
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                      {item.experience} Exp
                    </span>
                  </div>

                  <h3 className='text-slate-800 text-base font-bold flex items-center gap-1 group-hover:text-primary transition-colors'>
                    {item.name}
                    <span className="text-teal-600 text-sm" title="MCI Verified Profile">✓</span>
                  </h3>
                  
                  <p className='text-slate-400 text-xs mt-0.5 font-medium'>{item.degree}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Fee</p>
                    <p className="text-sm font-extrabold text-slate-800">
                      {currencySymbol}{item.fees}
                    </p>
                  </div>
                  
                  <div className="bg-teal-50 group-hover:bg-primary text-primary group-hover:text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300">
                    Book Slot
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.button 
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
        className='bg-primary text-white px-10 py-3 rounded-full font-semibold text-sm shadow-md shadow-primary/15 hover:bg-teal-800 transition-all mt-10'
      >
        View All Doctors
      </motion.button>
    </div>
  )
}

export default TopDoctors