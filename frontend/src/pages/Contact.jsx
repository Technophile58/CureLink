import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Header */}
      <div className='text-center pt-8 mb-12'>
        <h1 className='text-3xl font-extrabold text-[#0f766e] tracking-tight'>
          Contact <span className='text-slate-800 font-bold'>Us</span>
        </h1>
        <p className="text-slate-400 text-sm font-medium mt-1">We're here to assist with your medical appointments.</p>
      </div>

      {/* Content */}
      <div className='my-10 flex flex-col lg:flex-row gap-12 items-stretch justify-center mb-28'>
        
        {/* Contact Banner Image */}
        <div className="w-full lg:w-96 flex-shrink-0 bg-white border border-slate-100 rounded-3xl p-3 shadow-sm flex items-center justify-center">
          <img className='w-full h-auto rounded-2xl object-cover' src={assets.contact_image} alt="Contact CureLink Support" />
        </div>

        {/* Contact info details card */}
        <div className='flex-1 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between gap-6'>
          <div>
            <h2 className='font-bold text-slate-800 text-lg uppercase tracking-wider mb-4 flex items-center gap-2'>
              <span>📍</span> Corporate Office
            </h2>
            <p className='text-slate-500 leading-relaxed font-medium text-sm'>
              CureLink Technologies Private Limited <br />
              2nd Floor, Tech Valley Tower, <br />
              Sector 62, Noida, Uttar Pradesh, India – 201301
            </p>
          </div>

          <div className="h-px bg-slate-100"></div>

          <div>
            <h2 className='font-bold text-slate-800 text-lg uppercase tracking-wider mb-4 flex items-center gap-2'>
              <span>📞</span> Support Helpdesk
            </h2>
            <p className='text-slate-500 leading-relaxed font-medium text-sm'>
              Toll-Free Helpline: <span className="text-slate-800 font-bold">1800-120-CURE (2873)</span> <br />
              Customer Support: <span className="text-slate-800 font-bold">support@curelink.in</span> <br />
              Hospital Partners: <span className="text-primary font-bold">partners@curelink.in</span>
            </p>
          </div>

          <div className="h-px bg-slate-100"></div>

          <div>
            <h2 className='font-bold text-slate-800 text-xs uppercase tracking-widest mb-2 flex items-center gap-1.5'>
              <span>🕒</span> Support Availability
            </h2>
            <p className='text-xs text-slate-400 font-medium leading-relaxed'>
              Helpline is available from Monday to Saturday, 9:00 AM to 8:00 PM IST. <br />
              Online consultations and booking engines are active 24/7.
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Contact
