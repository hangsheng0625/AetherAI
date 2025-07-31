import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { dummyPublishedCreationData } from '../assets/assets';
import { Heart } from 'lucide-react';
import axios from 'axios'
import toast from 'react-hot-toast';
import { useAuth } from "@clerk/clerk-react";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
    
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      const {data} = await axios.get("/api/user/get-published-creations", {headers: {Authorization: `Bearer ${await getToken()}`}})
      if (data.success){
        setCreations(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)

    }
    setLoading(false);
  }

  const imageLikeToggle = async (id) => {
    try {
      const {data} = await axios.post("/api/user/toggle-like-creations", {id}, {headers: {Authorization: `Bearer ${await getToken()}`}})
      if (data.success){
        toast.success(data.message)
        await fetchCreations();
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return!loading ? (
    <div className="p-4">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Creations</h2>
      <br />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {creations.map((creation, index) => (
          <div
            key={index}
            className="flex flex-col justify-between border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
          >
            <img
              src={creation.content}
              alt={`Creation ${index + 1}`}
              className="w-full h-48 object-cover rounded-md mb-3"
            />

            <p className="text-gray-500 mb-2">{creation.prompt}</p>

            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span>{creation.likes.length}</span>
              <Heart
              onClick={()=> imageLikeToggle(creation.id)}
                className={`w-5 h-5 ${
                  creation.likes.includes(user?.id)
                    ? 'text-red-600'
                    : 'text-gray-400'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  ): (
    <div className='flex justify-center items-center h-full'>
      <span className='w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin'>

      </span>
    </div>
  )
};

export default Community;
