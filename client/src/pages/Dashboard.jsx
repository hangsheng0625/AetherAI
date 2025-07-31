import React, { useEffect, useState } from 'react';
import { Sparkles, Gem } from 'lucide-react';
import CreationItem from '../components/CreationItem';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      const res = await axios.get('/api/user/get-user-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (res.data.success) {
        setCreations(res.data.creations);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className='flex flex-col items-center justify-start min-h-screen bg-slate-50 px-4 py-2'>
      <div className='w-full max-w-6xl'>
        <h1 className='text-2xl font-semibold text-gray-800 mb-6'>Dashboard</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <div className='bg-white p-6 rounded-2xl shadow-md flex justify-between items-center'>
            <div>
              <p className='text-gray-600 text-sm'>Total Creations</p>
              <h2 className='text-3xl font-bold text-gray-800 mt-2'>{creations.length}</h2>
            </div>
            <Sparkles className='text-sky-500 w-8 h-8' />
          </div>

          <div className='bg-white p-6 rounded-2xl shadow-md flex justify-between items-center'>
            <div>
              <p className='text-gray-600 text-sm'>Active Plan</p>
              <h2 className='text-3xl font-bold text-gray-800 mt-2'>Premium</h2>
            </div>
            <Gem className='text-amber-500 w-8 h-8' />
          </div>
        </div>
      </div>

      {loading ? (
        <div className='flex justify-center items-center h-3/4'>
          <div className='animate-spin rounded-full h-11 w-11 border-4 border-purple-500 border-t-transparent'></div>
        </div>
      ) : (
        <div className='w-full max-w-6xl mt-12'>
          <p className='text-lg font-semibold text-gray-800 mb-4 rounded-5xl'>Recent Creations</p>
          {creations.map((item) => (
            <CreationItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
