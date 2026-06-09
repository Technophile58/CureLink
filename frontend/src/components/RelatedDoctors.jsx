import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

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
            <h2 className='text-2xl font-extrabold text-[#0f766e] tracking-tight text-center'>Related Doctors</h2>
            <p className='sm:w-1/3 text-center text-sm text-slate-500 font-medium'>Explore other verified doctors matching this speciality.</p>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-6'>
                {relDoc.map((item, index) => {
                    const rating = getMockRating(item.name)
                    return (
                        <div 
                            key={index}
                            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                            className='bg-white border border-slate-100 rounded-2xl overflow-hidden cursor-pointer hover:border-teal-300 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group'
                        >
                            {/* Image Container */}
                            <div className='relative bg-slate-50/80 overflow-hidden aspect-[4/3] flex items-center justify-center'>
                                <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name} />
                                
                                {/* Status badge */}
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

                            {/* Details */}
                            <div className='p-4 flex-1 flex flex-col justify-between'>
                                <div>
                                    <div className='flex items-center gap-1 mb-1'>
                                        <span className="text-[10px] bg-teal-50 text-[#0f766e] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                            {item.speciality}
                                        </span>
                                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                                            {item.experience}
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
                                            ₹{item.fees}
                                        </p>
                                    </div>
                                    <div className="bg-teal-50 group-hover:bg-primary text-primary group-hover:text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300">
                                        Book Slot
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RelatedDoctors