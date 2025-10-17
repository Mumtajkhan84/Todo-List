import React from 'react'

const navbar = () => {
  return (
   <nav className='flex justify-between  bg-slate-700 text-white py-4'>
    <div className="logo">
      <span className='font-bold text-xl mx-7'>iTask</span>
    </div>
    <ul className='flex gap-7 mx-8'>
    <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
    <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
    </ul>
   </nav>
  )
}

export default navbar
