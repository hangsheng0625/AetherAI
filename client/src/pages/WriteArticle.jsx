import React, { useState } from 'react';
import { Edit, Sparkles } from 'lucide-react';

const WriteArticle = () => {
  const articleLengths = [
    { length: 800, label: 'Short (500–800 words)' },
    { length: 1200, label: 'Medium (800–1200 words)' },
    { length: 2000, label: 'Long (1200+ words)' },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLengths[0]);
  const [input, setInput] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-full overflow-y-scroll bg-slate-50 p-6">
      <div className="flex gap-6">
        {/* Left Section: Article Configuration */}
        <form
          onSubmit={onSubmitHandler}
          className="w-1/2 bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-6"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="text-indigo-500" />
            <h1 className="text-xl font-semibold text-indigo-700">Article Configuration</h1>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Article Topic</label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="The future of artificial intelligence is..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Article Length</label>
            <div className="flex flex-col gap-2">
              {articleLengths.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedLength(item)}
                  className={`text-left p-2 rounded-md border transition ${
                    selectedLength.length === item.length
                      ? 'bg-indigo-100 border-indigo-500 text-indigo-800 font-medium'
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <button className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-500 transition-colors duration-200">
            <Edit className="w-5 h-5 mr-2 inline-block" />
            Generate Article
          </button>
        </form>

        {/* Right Section: Generated Article */}
        <div className="w-1/2 bg-white p-6 rounded-xl shadow-md border border-gray-200 ">
          <div className="flex items-center gap-2 mb-4">
            <Edit className="w-5 h-5 mr-2 text-indigo-500" />
            <h1 className="text-lg font-semibold text-indigo-700">Generated Article</h1>
          </div>

          <div className="text-gray-600">
            <p className='text-sm'>Enter a topic and generate an article to see the result here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;
