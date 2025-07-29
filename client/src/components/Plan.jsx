import React from 'react'
import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {
  return (
    <div className='max-w-2xl mx-auto z-20 my-30'>
        <div className='text-center'>
            <h2 className='text-slate-700 text-[42px] font-semibold'>Choose Your Plan</h2>
            <p className='text-gray-500 max-w-lg mx-auto'>Select a plan that suits your needs and start using our AI tools today.</p>
        </div>

        <div className='mt-12'>
            <PricingTable
                className="mt-12"
                appearance={{
                    baseTheme: {
                        color: 'black',
                        fontFamily: 'Arial, sans-serif',
                    },
                    primaryColor: '#4F46E5', // Primary color for the plan cards
                    secondaryColor: '#E5E7EB', // Secondary color for the background
                }}
            />
        </div>
    </div>
  )
}

export default Plan