import React from 'react'
import { useState } from 'react';
import Markdown from 'react-markdown';
import { Trash2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const CreationItem = ({item, onDelete}) => {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { getToken } = useAuth();

  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent expanding when clicking delete
    
    if (!confirm('Are you sure you want to delete this creation? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      const res = await axios.delete(`/api/user/delete-creation/${item.id}`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        onDelete(item.id); // Call parent function to update the list
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('Failed to delete creation');
    }
    setDeleting(false);
  };
  return (
    <div className='bg-white p-4 rounded-lg shadow-md mb-4' >
        <div className='flex justify-between items-center'>
            <div onClick={() => setExpanded(!expanded)} className='flex-1 cursor-pointer'>
                <h2>
                    {item.prompt}
                    <p className='text-gray-500'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>
                </h2>
            </div>
            <div className='flex items-center gap-2'>
                <button className='bg-blue-100 text-blue-500 px-4 py-2 rounded-lg'>{item.type}</button>
                <button 
                    onClick={handleDelete}
                    disabled={deleting}
                    className='bg-red-100 text-red-500 hover:bg-red-200 p-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                    title="Delete creation"
                >
                    {deleting ? (
                        <div className='animate-spin rounded-full h-4 w-4 border-2 border-red-500 border-t-transparent'></div>
                    ) : (
                        <Trash2 className='w-4 h-4' />
                    )}
                </button>
            </div>
        </div>

        {
          expanded && (
            <div className='mt-4'>
              {item.type === 'image' ? (
                <div>
                  <div className='animate-pulse h-48 bg-gray-200 rounded-lg mb-4' />
                  <img src={item.content} alt="image" className='w-full h-auto rounded-lg' />
                </div>
              ) : (
                <div className='bg-gray-100 p-4 rounded-lg'>
                  <div className='reset-tw'>
                    <Markdown>
                      {item.content}
                    </Markdown>
                  </div>
                </div>
              )}
            </div>
          )
        }
    </div>
  )
}

export default CreationItem