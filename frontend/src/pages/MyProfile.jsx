import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)

    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    // Function to update user profile data using API
    const updateUserProfileData = async () => {

        try {

            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    return userData ? (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
                
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-teal-800 to-teal-700 px-6 py-8 md:px-8 text-white relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
                    <div className="flex flex-col sm:flex-row items-center gap-6 z-10 relative">
                        
                        {/* Profile Image upload/display */}
                        <div className="relative">
                            {isEdit ? (
                                <label htmlFor='image' className="cursor-pointer group block">
                                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/60 group-hover:border-white transition-all relative">
                                        <img className='w-full h-full object-cover opacity-85' src={image ? URL.createObjectURL(image) : userData.image} alt="Avatar" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                            CHANGE
                                        </div>
                                    </div>
                                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                                </label>
                            ) : (
                                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/40 shadow-md">
                                    <img className='w-full h-full object-cover' src={userData.image} alt={userData.name} />
                                </div>
                            )}
                        </div>

                        {/* Profile Name details */}
                        <div className="text-center sm:text-left flex-1">
                            {isEdit ? (
                                <input 
                                    className='bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 text-white rounded-lg px-3 py-1.5 text-xl font-bold w-full max-w-xs focus:outline-none focus:border-white placeholder-teal-200' 
                                    type="text" 
                                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                                    value={userData.name} 
                                />
                            ) : (
                                <h1 className='text-2xl font-extrabold flex items-center justify-center sm:justify-start gap-1.5'>
                                    {userData.name}
                                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Verified User</span>
                                </h1>
                            )}
                            <p className="text-teal-100 text-xs font-semibold mt-1">CureLink Health ID: CL-{(userData._id || 'PAT').substring(0, 8).toUpperCase()}</p>
                        </div>
                    </div>
                </div>

                {/* Profile Fields Details */}
                <div className="p-6 md:p-8 space-y-8">
                    
                    {/* Contact Folder */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                            <span>📞</span> Contact Information
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-x-4 gap-y-3.5 text-sm">
                            <p className="text-slate-400 font-bold">Email Address:</p>
                            <p className="text-slate-700 font-semibold">{userData.email}</p>

                            <p className="text-slate-400 font-bold">Phone Number:</p>
                            {isEdit ? (
                                <input 
                                    className='bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2 text-slate-700 text-sm focus:outline-none focus:border-primary max-w-xs' 
                                    type="text" 
                                    onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                                    value={userData.phone} 
                                />
                            ) : (
                                <p className="text-slate-700 font-semibold">{userData.phone || 'Not added'}</p>
                            )}

                            <p className="text-slate-400 font-bold">Postal Address:</p>
                            {isEdit ? (
                                <div className="space-y-2 max-w-md">
                                    <input 
                                        className='w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2 text-slate-700 text-sm focus:outline-none focus:border-primary' 
                                        type="text" 
                                        onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                        value={userData.address.line1} 
                                        placeholder="Address Line 1"
                                    />
                                    <input 
                                        className='w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2 text-slate-700 text-sm focus:outline-none focus:border-primary' 
                                        type="text" 
                                        onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                        value={userData.address.line2} 
                                        placeholder="Address Line 2"
                                    />
                                </div>
                            ) : (
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    {userData.address.line1 || 'No address added'} <br /> 
                                    {userData.address.line2}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="h-px bg-slate-100"></div>

                    {/* Basic Info Folder */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                            <span>🧬</span> Demographics & Basic Info
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-x-4 gap-y-3.5 text-sm">
                            <p className="text-slate-400 font-bold">Gender Identity:</p>
                            {isEdit ? (
                                <select 
                                    className="bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2 text-slate-700 text-sm focus:outline-none focus:border-primary max-w-[200px]"
                                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                                    value={userData.gender}
                                >
                                    <option value="Not Selected">Not Selected</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            ) : (
                                <p className="text-slate-700 font-semibold">{userData.gender}</p>
                            )}

                            <p className="text-slate-400 font-bold">Date of Birth:</p>
                            {isEdit ? (
                                <input 
                                    className="bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2 text-slate-700 text-sm focus:outline-none focus:border-primary max-w-[200px]"
                                    type='date' 
                                    onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                                    value={userData.dob} 
                                />
                            ) : (
                                <p className="text-slate-700 font-semibold">{userData.dob || 'Not selected'}</p>
                            )}
                        </div>
                    </div>

                    <div className="h-px bg-slate-100"></div>

                    {/* Actions Block */}
                    <div className="flex justify-end gap-3 pt-2">
                        {isEdit ? (
                            <>
                                <button 
                                    onClick={() => { setIsEdit(false); setImage(false) }}
                                    className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-500 font-semibold hover:bg-slate-50 transition-colors text-sm"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={updateUserProfileData} 
                                    className="px-8 py-2.5 rounded-xl bg-[#f97316] text-white font-bold hover:bg-orange-600 shadow-md shadow-orange-500/10 transition-colors text-sm"
                                >
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <button 
                                onClick={() => setIsEdit(true)} 
                                className="px-8 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-teal-800 shadow-md shadow-primary/10 transition-colors text-sm"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    ) : null
}

export default MyProfile