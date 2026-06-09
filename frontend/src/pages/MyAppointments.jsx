import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Getting User Appointments Data Using API
    const getUserAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {

                console.log(response)

                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Function to make payment using razorpay
    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to make payment using stripe
    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }



    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className='pb-4 mt-6 text-2xl font-extrabold text-[#0f766e] border-b border-slate-100 flex items-center gap-2'>
                <span>📅</span> My Scheduled Appointments
            </h1>
            
            <div className='mt-8 space-y-6'>
                {appointments.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-400 shadow-sm">
                        <span className="text-4xl block mb-2">🗓️</span>
                        <p className="font-semibold text-slate-600">No appointments scheduled yet.</p>
                        <p className="text-xs text-slate-400 mt-1">Browse our verified doctor directory to consult an expert.</p>
                    </div>
                ) : (
                    appointments.map((item, index) => (
                        <div 
                            key={index} 
                            className='bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center gap-6'
                        >
                            {/* Doctor Image */}
                            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0 mx-auto md:mx-0">
                                <img className='w-full h-full object-cover' src={item.docData.image} alt={item.docData.name} />
                            </div>

                            {/* Details Column */}
                            <div className='flex-1 text-sm text-slate-500 text-center md:text-left'>
                                <h3 className='text-slate-800 text-base font-extrabold flex flex-col sm:flex-row sm:items-center justify-center md:justify-start gap-1 sm:gap-2'>
                                    {item.docData.name}
                                    <span className="text-teal-600 text-xs bg-teal-50 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider self-center">
                                        {item.docData.speciality}
                                    </span>
                                </h3>
                                
                                <p className="text-xs font-semibold text-slate-400 mt-1.5 flex items-center justify-center md:justify-start gap-1">
                                    <span>📍</span>
                                    <span>{item.docData.address.line1}, {item.docData.address.line2}</span>
                                </p>

                                <div className="mt-4 pt-3 border-t border-slate-100/80 flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1.5 text-xs">
                                    <p className="font-semibold text-slate-700">
                                        📅 Date: <span className="text-slate-500 font-medium">{slotDateFormat(item.slotDate)}</span>
                                    </p>
                                    <p className="font-semibold text-slate-700">
                                        ⏰ Time: <span className="text-slate-500 font-medium">{item.slotTime}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons / Status Badge */}
                            <div className='flex flex-col gap-2.5 justify-center text-xs text-center md:w-52 flex-shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6'>
                                {/* Completed Status */}
                                {item.isCompleted && (
                                    <span className='w-full py-2.5 bg-emerald-50 text-emerald-700 font-bold rounded-xl border border-emerald-200 block'>
                                        ✓ Consult Completed
                                    </span>
                                )}

                                {/* Cancelled Status */}
                                {item.cancelled && !item.isCompleted && (
                                    <span className='w-full py-2.5 bg-rose-50 text-rose-600 font-bold rounded-xl border border-rose-100 block'>
                                        ✗ Appointment Cancelled
                                    </span>
                                )}

                                {/* Paid Status */}
                                {!item.cancelled && item.payment && !item.isCompleted && (
                                    <span className='w-full py-2.5 bg-teal-50 text-teal-700 font-bold rounded-xl border border-teal-100 block'>
                                        ✓ Paid Online (₹{item.amount || item.docData.fees})
                                    </span>
                                )}

                                {/* Standard action workflows (Unpaid, Not cancelled) */}
                                {!item.cancelled && !item.payment && !item.isCompleted && (
                                    <>
                                        {/* Pay online toggle */}
                                        {payment !== item._id ? (
                                            <button 
                                                onClick={() => setPayment(item._id)} 
                                                className='bg-primary text-white font-bold py-2.5 rounded-xl hover:bg-teal-800 transition-all shadow-sm'
                                            >
                                                Pay Online (₹{item.docData.fees})
                                            </button>
                                        ) : (
                                            <div className="flex flex-col gap-1.5 p-1 bg-slate-50 rounded-xl border border-slate-100">
                                                <button 
                                                    onClick={() => appointmentStripe(item._id)} 
                                                    className='bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 font-medium py-2 rounded-lg transition-all flex items-center justify-center'
                                                >
                                                    <img className='max-h-4 object-contain' src={assets.stripe_logo} alt="Stripe" />
                                                </button>
                                                <button 
                                                    onClick={() => appointmentRazorpay(item._id)} 
                                                    className='bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 font-medium py-2 rounded-lg transition-all flex items-center justify-center'
                                                >
                                                    <img className='max-h-4 object-contain' src={assets.razorpay_logo} alt="Razorpay" />
                                                </button>
                                            </div>
                                        )}

                                        {/* Cancel option */}
                                        <button 
                                            onClick={() => cancelAppointment(item._id)} 
                                            className='text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200/80 hover:border-rose-100 font-bold py-2.5 rounded-xl transition-all'
                                        >
                                            Cancel Booking
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default MyAppointments