import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {

        setDocSlots([])

        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {

            // getting date with index 
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = [];


            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {

                    // Add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]))

        }

    }

    const bookAppointment = async () => {

        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        try {

            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    return docInfo ? (
        <div className="max-w-5xl mx-auto px-4 py-8">

            {/* ---------- Doctor Details ----------- */}
            <div className='flex flex-col md:flex-row gap-8 items-stretch'>
                {/* Image Container Card */}
                <div className="w-full md:w-80 flex-shrink-0 bg-white border border-slate-100 rounded-3xl p-4 shadow-sm flex flex-col items-center justify-center">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                        <img className='w-full h-full object-cover' src={docInfo.image} alt={docInfo.name} />
                        <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm py-2 px-3 rounded-xl shadow-md border border-slate-100 text-center">
                            <p className="text-[10px] text-teal-600 font-extrabold uppercase tracking-widest">NMC Registered</p>
                            <p className="text-xs text-slate-700 font-bold mt-0.5">Verified Medical Expert</p>
                        </div>
                    </div>
                </div>

                {/* Info Description Card */}
                <div className='flex-1 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between'>
                    <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-[10px] bg-teal-50 text-teal-700 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                                {docInfo.speciality}
                            </span>
                            <span className="text-[10px] bg-amber-50 text-amber-700 px-3 py-1 rounded-full font-bold">
                                {docInfo.experience} Experience
                            </span>
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">
                                Reg No: NMC/{docInfo._id.charCodeAt(3) || 5831}
                            </span>
                        </div>

                        <h1 className='text-3xl font-extrabold text-[#0f766e] flex items-center gap-2'>
                            {docInfo.name} 
                            <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm font-bold" title="Verified Professional">✓</span>
                        </h1>
                        <p className='text-slate-400 text-sm font-semibold mt-1'>{docInfo.degree} - General & Clinical Care</p>
                        
                        <div className="h-px bg-slate-100 my-5"></div>

                        {/* ----- Doc About ----- */}
                        <div>
                            <p className='flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2'>
                                Biography
                            </p>
                            <p className='text-sm text-slate-600 leading-relaxed font-medium'>{docInfo.about}</p>
                        </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Consultation Fee</p>
                            <p className="text-2xl font-extrabold text-slate-800 mt-1">
                                {currencySymbol}{docInfo.fees} <span className="text-xs text-slate-400 font-medium font-sans">(includes digital receipt)</span>
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl text-xs font-bold">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Available for Bookings
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking slots */}
            <div className='bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm mt-8'>
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <span>📅</span> Choose Appointment Slot
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-1">Select your preferred date and time to secure an instant confirmation.</p>

                {/* Days row */}
                <div className='flex gap-3.5 items-center w-full overflow-x-auto no-scrollbar py-4 mt-4'>
                    {docSlots.length && docSlots.map((item, index) => (
                        <div 
                            onClick={() => setSlotIndex(index)} 
                            key={index} 
                            className={`text-center py-4 px-5 min-w-16 rounded-2xl cursor-pointer transition-all duration-300 border flex flex-col justify-center ${
                                slotIndex === index 
                                    ? 'bg-primary border-primary text-white shadow-md shadow-primary/20 scale-105' 
                                    : 'bg-white border-slate-100 hover:border-teal-200 text-slate-600'
                            }`}
                        >
                            <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                                {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                            </p>
                            <p className="text-lg font-extrabold mt-1">
                                {item[0] && item[0].datetime.getDate()}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="h-px bg-slate-100 my-6"></div>

                {/* Slots grouped by Morning and Afternoon/Evening */}
                {docSlots.length > 0 && (
                    <div className="space-y-6">
                        {/* Morning Slots */}
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                <span>☀️</span> Morning Sessions (Before 12 PM)
                            </p>
                            <div className="flex flex-wrap gap-2.5">
                                {docSlots[slotIndex].filter(item => item.datetime.getHours() < 12).length === 0 ? (
                                    <p className="text-xs text-slate-400 italic">No slots available for this morning.</p>
                                ) : (
                                    docSlots[slotIndex].filter(item => item.datetime.getHours() < 12).map((item, index) => (
                                        <p 
                                            onClick={() => setSlotTime(item.time)} 
                                            key={index} 
                                            className={`text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer border transition-all ${
                                                item.time === slotTime 
                                                    ? 'bg-primary border-primary text-white shadow-sm' 
                                                    : 'bg-white border-slate-100 hover:border-teal-200 text-slate-600'
                                            }`}
                                        >
                                            {item.time.toLowerCase()}
                                        </p>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Afternoon & Evening Slots */}
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                <span>🌙</span> Afternoon & Evening Sessions (Post 12 PM)
                            </p>
                            <div className="flex flex-wrap gap-2.5">
                                {docSlots[slotIndex].filter(item => item.datetime.getHours() >= 12).length === 0 ? (
                                    <p className="text-xs text-slate-400 italic">No slots available for this evening.</p>
                                ) : (
                                    docSlots[slotIndex].filter(item => item.datetime.getHours() >= 12).map((item, index) => (
                                        <p 
                                            onClick={() => setSlotTime(item.time)} 
                                            key={index} 
                                            className={`text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer border transition-all ${
                                                item.time === slotTime 
                                                    ? 'bg-primary border-primary text-white shadow-sm' 
                                                    : 'bg-white border-slate-100 hover:border-teal-200 text-slate-600'
                                            }`}
                                        >
                                            {item.time.toLowerCase()}
                                        </p>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8 flex justify-end">
                    <button 
                        onClick={bookAppointment} 
                        className="w-full md:w-auto bg-[#f97316] text-white text-sm font-bold px-12 py-3.5 rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-500/20 active:scale-98"
                    >
                        Confirm Booking Slot
                    </button>
                </div>
            </div>

            {/* Listing Related Doctors */}
            <div className="mt-12">
                <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
            </div>
        </div>
    ) : null
}

export default Appointment