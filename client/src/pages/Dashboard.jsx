import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Sparkles, Gem } from 'lucide-react'
import CreationItem from '../components/CreationItem'

const Dashboard = () => {
  const [creations, setCreations] = useState([])

  const getDashboardData = async () => {
    setCreations(dummyCreationData)
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <div className='flex flex-col items-center justify-start min-h-screen bg-slate-50 px-4 py-2'>
      <div className='w-full max-w-6xl'>
        <h1 className='text-2xl font-semibold text-gray-800 mb-6'>Dashboard</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {/* Total Creations Card */}
          <div className='bg-white p-6 rounded-2xl shadow-md flex justify-between items-center'>
            <div>
              <p className='text-gray-600 text-sm'>Total Creations</p>
              <h2 className='text-3xl font-bold text-gray-800 mt-2'>{creations.length}</h2>
            </div>
            <Sparkles className='text-sky-500 w-8 h-8' />
          </div>

          {/* Premium Users Card */}
          <div className='bg-white p-6 rounded-2xl shadow-md flex justify-between items-center'>
            <div>
              <p className='text-gray-600 text-sm'>Active Plan</p>
              <h2 className='text-3xl font-bold text-gray-800 mt-2'>Premium</h2> {/* Replace with dynamic value if needed */}
            </div>
            <Gem className='text-amber-500 w-8 h-8' />
          </div>
        </div>
      </div>

      <div className='w-full max-w-6xl mt-12'>
        <p className='text-lg font-semibold text-gray-800 mb-4'>Recent Creations</p>
        {
          creations.map((item)=> <CreationItem key={item.id} item={item} />)
        }
      </div>
    </div>
  )
}

export default Dashboard
