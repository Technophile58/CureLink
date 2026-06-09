import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const specialitySubtexts = {
  'General physician': 'Cold, cough, fever, infections',
  'Gynecologist': 'Pregnancy, women\'s health, periods',
  'Dermatologist': 'Acne, hair fall, skin issues',
  'Pediatricians': 'Child health, growth, vaccines',
  'Neurologist': 'Headaches, nerves, spine care',
  'Gastroenterologist': 'Acidity, bloating, digestion'
}

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-slate-800 px-4 max-w-7xl mx-auto'>
      <h2 className='text-3xl font-extrabold text-[#0f766e] tracking-tight text-center'>
        Find Doctors by Speciality
      </h2>
      <p className='sm:w-1/2 text-center text-sm text-slate-500 leading-relaxed font-medium'>
        Browse verified healthcare experts across top fields. Schedule in-clinic visits or online consultations instantly.
      </p>
      
      {/* Horizontal scrolling list */}
      <div className='flex gap-5 pt-8 w-full overflow-x-auto no-scrollbar pb-4 sm:justify-center'>
        {specialityData.map((item, index) => (
          <Link 
            key={index}
            to={`/doctors/${item.speciality}`} 
            onClick={() => scrollTo(0, 0)} 
            className='flex flex-col items-center text-center p-5 rounded-2xl w-40 sm:w-48 bg-white border border-slate-100 hover:border-teal-200 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex-shrink-0 group cursor-pointer'
          >
            {/* Circular background badge for icons */}
            <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-teal-50/70 group-hover:bg-teal-50 flex items-center justify-center mb-4 transition-colors duration-300'>
              <img className='w-10 sm:w-12 h-auto group-hover:scale-110 transition-transform duration-300' src={item.image} alt={item.speciality} />
            </div>
            <p className='font-bold text-slate-700 text-sm group-hover:text-primary transition-colors'>{item.speciality}</p>
            <p className='text-[10px] text-slate-400 font-medium mt-1 group-hover:text-slate-500 transition-colors'>
              {specialitySubtexts[item.speciality] || 'General medical advice'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu