import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Title */}
      <div className='text-center pt-8 mb-12'>
        <h1 className='text-3xl font-extrabold text-[#0f766e] tracking-tight'>
          About <span className='text-slate-800 font-bold'>CureLink</span>
        </h1>
        <p className="text-slate-400 text-sm font-medium mt-1">Bharat's Digital Healthcare Partner</p>
      </div>

      {/* Main Info */}
      <div className='my-10 flex flex-col lg:flex-row gap-12 items-center'>
        <div className="w-full lg:w-96 flex-shrink-0 rounded-3xl overflow-hidden border border-slate-100 shadow-md bg-white p-3">
          <img className='w-full h-auto rounded-2xl' src={assets.about_image} alt="About CureLink" />
        </div>
        <div className='flex flex-col justify-center gap-5 lg:w-3/5 text-sm text-slate-600 leading-relaxed font-medium'>
          <p>
            Welcome to <b className="text-primary">CureLink</b>, India's reliable partner in simplifying digital healthcare access. 
            At CureLink, we bridge the communication gap between patients and clinics by providing structured doctor appointments, verified credentials validation, and digital prescription tracking.
          </p>
          <p>
            We believe that consulting a top physician should be as fast as ordering groceries. By validating doctors against state medical registries, we ensure that every expert profile on our network holds standard, verified degrees like MBBS, MD, and MS.
          </p>
          
          <div className="h-px bg-slate-100 my-2"></div>
          
          <b className='text-slate-800 text-xs font-bold uppercase tracking-wider'>Our Vision</b>
          <p>
            To construct a cohesive, secure health registry across India. Empowering patients with instant diagnostic access, vetted expert reviews, and hassle-free consulting, whether online or in-clinic.
          </p>
        </div>
      </div>

      {/* Stats Counter Section (Indian Context) */}
      <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center my-16 shadow-sm">
        <div>
          <p className="text-3xl font-extrabold text-primary">10 Lakh+</p>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mt-1">Happy Patients</p>
        </div>
        <div>
          <p className="text-3xl font-extrabold text-primary">1,000+</p>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mt-1">Verified Doctors</p>
        </div>
        <div>
          <p className="text-3xl font-extrabold text-primary">50+</p>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mt-1">Cities Covered</p>
        </div>
        <div>
          <p className="text-3xl font-extrabold text-[#f97316]">99.9%</p>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mt-1">Booking Success</p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='text-center mb-8'>
        <h2 className='text-2xl font-extrabold text-slate-800 tracking-tight'>
          Why Choose <span className="text-primary">CureLink</span>
        </h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-20'>
        <div className='bg-white border border-slate-100 rounded-2xl p-8 shadow-sm flex flex-col gap-3 text-sm text-slate-500 hover:border-teal-200 hover:shadow-md transition-all duration-300 cursor-pointer group'>
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-lg font-bold group-hover:bg-primary group-hover:text-white transition-colors">⚡</div>
          <h3 className='font-bold text-slate-800 text-base mt-2 group-hover:text-primary transition-colors'>EFFICIENCY</h3>
          <p className="leading-relaxed">Instant real-time slot selection with NMC verified professionals, saving your clinic queue waiting time.</p>
        </div>
        
        <div className='bg-white border border-slate-100 rounded-2xl p-8 shadow-sm flex flex-col gap-3 text-sm text-slate-500 hover:border-teal-200 hover:shadow-md transition-all duration-300 cursor-pointer group'>
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-lg font-bold group-hover:bg-primary group-hover:text-white transition-colors">🔒</div>
          <h3 className='font-bold text-slate-800 text-base mt-2 group-hover:text-primary transition-colors'>CONVENIENCE</h3>
          <p className="leading-relaxed">Consult from anywhere in India with secure gateway payments including Razorpay and Stripe checkouts.</p>
        </div>

        <div className='bg-white border border-slate-100 rounded-2xl p-8 shadow-sm flex flex-col gap-3 text-sm text-slate-500 hover:border-teal-200 hover:shadow-md transition-all duration-300 cursor-pointer group'>
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-lg font-bold group-hover:bg-primary group-hover:text-white transition-colors">🎗️</div>
          <h3 className='font-bold text-slate-800 text-base mt-2 group-hover:text-primary transition-colors'>VERIFIED CARE</h3>
          <p className="leading-relaxed">Every practitioner profile is vetted against state councils, securing 100% genuine medical opinions.</p>
        </div>
      </div>

    </div>
  )
}

export default About
