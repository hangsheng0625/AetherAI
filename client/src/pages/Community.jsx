import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { dummyPublishedCreationData } from '../assets/assets';
import { Heart } from 'lucide-react';

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setCreations(dummyPublishedCreationData);
    }
  }, [user]);

  return (
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
  );
};

export default Community;
