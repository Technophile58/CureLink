// import React from 'react'
// import { assets } from '../assets/assets'

// const Footer = () => {
//   return (
//     <div className='md:mx-10'>
//       <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

//         <div>
//           <img className='mb-5 w-40' src={assets.logo} alt="" />
//           <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
//         </div>

//         <div>
//           <p className='text-xl font-medium mb-5'>COMPANY</p>
//           <ul className='flex flex-col gap-2 text-gray-600'>
//             <li>Home</li>
//             <li>About us</li>
//             <li>Delivery</li>
//             <li>Privacy policy</li>
//           </ul>
//         </div>

//         <div>
//           <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
//           <ul className='flex flex-col gap-2 text-gray-600'>
//             <li>+1-212-456-7890</li>
//             <li>greatstackdev@gmail.com</li>
//           </ul>
//         </div>

//       </div>

//       <div>
//         <hr />
//         <p className='py-5 text-sm text-center'>Copyright 2024 @ Prescripto.com - All Right Reserved.</p>
//       </div>

//     </div>
//   )
// }

// export default Footer



import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10 mt-32 border-t border-slate-200/60 pt-16 pb-8 text-sm text-slate-500 max-w-7xl mx-auto'>
      <div className='flex flex-col lg:grid lg:grid-cols-4 gap-12 mb-12'>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="logo text-3xl font-extrabold tracking-tight cursor-pointer select-none flex items-center gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <span className="text-xl font-bold">+</span>
            </div>
            <div>
              <span className="text-[#0f766e]">Cure</span>
              <span className="text-[#f97316]">Link</span>
            </div>
          </div>
          <p className='w-full lg:w-4/5 text-slate-400 leading-relaxed font-medium'>
            CureLink is India's leading digital doctor appointment portal. Connecting patients with verified MCI/NMC registered medical professionals. Empowering families with healthcare convenience 24/7.
          </p>
        </div>

        <div>
          <p className='text-slate-800 font-bold text-sm tracking-wider uppercase mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2.5 font-medium text-slate-400'>
            <li className="hover:text-primary transition-colors cursor-pointer">Home</li>
            <li className="hover:text-primary transition-colors cursor-pointer">About Us</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Contact Us</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-slate-800 font-bold text-sm tracking-wider uppercase mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2.5 font-medium text-slate-400'>
            <li className="flex items-center gap-2">
              <span>📞</span>
              <span className="hover:text-primary transition-colors cursor-pointer">1800-120-CURE (2873)</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span>
              <span className="hover:text-primary transition-colors cursor-pointer">support@curelink.in</span>
            </li>
            <li className="flex items-start gap-2 text-xs leading-relaxed mt-2 text-slate-400/80 font-normal">
              <span>📍</span>
              <span>2nd Floor, Tech Valley Tower, Sector 62, Noida, Uttar Pradesh, India - 201301</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-slate-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400">
        <p>Copyright © 2026 CureLink.in — All Rights Reserved.</p>
        <p className="flex gap-4">
          <span className="hover:underline cursor-pointer">Terms of Service</span>
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
        </p>
      </div>

    </div>
  )
}

export default Footer
