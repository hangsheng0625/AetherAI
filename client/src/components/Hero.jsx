import React from 'react'
import { useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets.js'

const Hero = () => {

    const navigate = useNavigate();
  return (
    <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen'>
        <div className='text-center mb-6'>
            <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'>Create amazing content <br/> with
            <span className='text-primary'> AI tools </span></h1>
            <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600'>Unleash your creativity with our powerful AI-driven platform.</p>
        </div>

        <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'> 
            <button onClick={() => navigate('/ai')} className='bg-primary text-white py-2 px-4 rounded-3xl cursor-pointer'>Start creating now</button>
            <button className='border border-primary text-primary py-2 px-4 rounded-3xl cursor-pointer'>Watch Demo</button>
        </div>

        <div className='flex items-center justify-center gap-2 mt-8 text-gray-600'>
            <img src={assets.user_group} alt="user Group" className='h-8' /> Trusted by 1000+ users
        </div>
    </div>
    

  )
}

export default Hero