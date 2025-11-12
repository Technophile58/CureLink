import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="About CureLink" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>
            Welcome to <b>CureLink</b>, your reliable partner in simplifying healthcare connections.
            At CureLink, we understand how difficult it can be to schedule doctor appointments,
            manage health records, and stay on top of your well-being — so we built a smarter way to do it.
          </p>
          <p>
            CureLink is committed to redefining healthcare accessibility through technology.
            We continuously enhance our platform to provide a seamless, user-friendly experience for both patients and healthcare providers.
            Whether you're booking your first consultation or managing long-term care, CureLink is here to guide you every step of the way.
          </p>
          <b className='text-gray-800'>Our Vision</b>
          <p>
            Our vision at <b>CureLink</b> is to build a connected healthcare ecosystem that empowers users to take charge of their health.
            We aim to bridge the gap between patients and doctors with secure, efficient, and personalized solutions.
          </p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>Quick and simple appointment booking that saves your valuable time.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE:</b>
          <p>Connect instantly with trusted healthcare professionals around you.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZATION:</b>
          <p>Receive tailored reminders and health suggestions designed just for you.</p>
        </div>
      </div>

    </div>
  )
}

export default About
