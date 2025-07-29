import React from 'react'
import { useState } from 'react';
import Markdown from 'react-markdown';

const CreationItem = ({item}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div onClick={() => setExpanded(!expanded)} className='bg-white p-4 rounded-lg shadow-md mb-4' >
        <div className='flex justify-between items-center cursor-pointer '>
            <div>
                <h2>
                    {item.prompt}
                    <p className='text-gray-500'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>
                </h2>
            </div>
            <button className='bg-blue-100 text-blue-500 px-4 py-2 rounded-lg'>{item.type}</button>
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