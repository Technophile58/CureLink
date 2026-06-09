import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const { doctors, currencySymbol } = useContext(AppContext)

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ]

  const applyFilter = () => {
    let temp = doctors
    if (speciality) {
      temp = temp.filter(doc => doc.speciality === speciality)
    }
    if (searchTerm) {
      const query = searchTerm.toLowerCase()
      temp = temp.filter(doc => 
        doc.name.toLowerCase().includes(query) ||
        doc.speciality.toLowerCase().includes(query) ||
        doc.degree.toLowerCase().includes(query)
      )
    }
    setFilterDoc(temp)
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality, searchTerm])

  const getMockRating = (name) => {
    const score = 4 + (name.length % 10) * 0.1
    const stories = 45 + (name.length * 7)
    return {
      stars: score.toFixed(1),
      count: stories
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f766e]">Find Top Medical Specialists</h1>
          <p className='text-slate-400 text-sm font-medium mt-1'>Browse verified Indian doctors and schedule slot appointments.</p>
        </div>

        {/* Live Search Console */}
        <div className="relative max-w-md w-full md:w-80">
          <input
            type="text"
            placeholder="Search by name, degree..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200/80 rounded-full px-5 py-2.5 pl-11 text-sm text-slate-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 shadow-sm transition-all"
          />
          <span className="absolute left-4 top-3.5 text-slate-400 text-sm">🔍</span>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-2.5 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Main Grid Section */}
      <div className='flex flex-col lg:flex-row items-start gap-8 mt-5'>
        
        {/* Sidebar Filters Button (Mobile) */}
        <button 
          onClick={() => setShowFilter(!showFilter)} 
          className={`lg:hidden w-full py-2.5 px-4 border border-slate-200 rounded-xl text-sm font-bold flex items-center justify-center gap-2 bg-white text-slate-600 transition-all ${
            showFilter ? 'border-primary text-primary bg-teal-50/20' : ''
          }`}
        >
          <span>Department Filters</span>
          <span>{showFilter ? '▲' : '▼'}</span>
        </button>

        {/* Filters Panel */}
        <div className={`w-full lg:w-64 flex-shrink-0 flex-col gap-3 text-sm text-slate-600 ${showFilter ? 'flex' : 'hidden lg:flex'}`}>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">Departments</p>
          {specialities.map((dept) => {
            const isSelected = speciality === dept
            return (
              <p
                key={dept}
                onClick={() => isSelected ? navigate('/doctors') : navigate(`/doctors/${dept}`)}
                className={`w-full pl-4 py-3 pr-4 border rounded-xl transition-all font-semibold cursor-pointer flex items-center justify-between shadow-sm ${
                  isSelected 
                    ? 'bg-primary text-white border-primary shadow-primary/10' 
                    : 'bg-white border-slate-100 hover:border-teal-200 text-slate-700'
                }`}
              >
                <span>{dept}</span>
                {isSelected && <span className="text-white text-xs bg-white/20 px-1.5 py-0.5 rounded-full">✓</span>}
              </p>
            )
          })}
        </div>

        {/* Doctor Results Grid */}
        <div className='flex-1 w-full'>
          {filterDoc.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-400">
              <span className="text-3xl block mb-2">🧑‍⚕️</span>
              <p className="font-semibold">No doctors found matching the search criteria.</p>
              <button 
                onClick={() => { setSearchTerm(''); navigate('/doctors') }}
                className="text-primary text-xs font-bold underline mt-2"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
              {filterDoc.map((item, index) => {
                const rating = getMockRating(item.name)
                return (
                  <motion.div 
                    key={index}
                    onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                    className='bg-white border border-slate-100 rounded-2xl overflow-hidden cursor-pointer hover:border-teal-300 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group'
                    whileHover={{ y: -6 }}
                  >
                    {/* Image */}
                    <div className='relative bg-slate-50 overflow-hidden aspect-[4/3] flex items-center justify-center'>
                      <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name} />
                      
                      {/* Available Tag */}
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                        <span className={`relative flex h-2 w-2`}>
                          {item.available && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${item.available ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                        </span>
                        <span className={`text-[10px] font-bold ${item.available ? 'text-emerald-600' : 'text-slate-500'}`}>
                          {item.available ? 'Available' : 'Busy'}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded-lg flex items-center gap-1 text-[10px] font-semibold">
                        <span className="text-amber-400">★</span>
                        <span>{rating.stars}</span>
                        <span className="text-slate-300 font-normal">({rating.count})</span>
                      </div>
                    </div>

                    {/* Content Details */}
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
                          <span className="text-teal-600 text-sm">✓</span>
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
          )}
        </div>

      </div>
    </div>
  )
}

export default Doctors