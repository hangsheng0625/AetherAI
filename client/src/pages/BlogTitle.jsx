import React from "react";
import { useState } from "react";
import { Sparkles, Edit, Hash } from "lucide-react";


const BlogTitle = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Health",
    "Lifestyle",
    "Travel",
    "Education",
    "Finance",
    "Food",
    "Entertainment",
    "Sports",
    "Fashion",
  ];

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");

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
            <h1 className="text-xl font-semibold text-indigo-700">
              AI Title Generator
            </h1>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Keyword
            </label>
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
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Category
            </label>
            <div className="flex flex-col gap-2">
              {blogCategories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSelectedCategory(item)}
                  className={`text-left p-2 rounded-md border transition ${
                    selectedCategory === item
                      ? "bg-indigo-100 border-indigo-500 text-indigo-800 font-medium"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-500 transition-colors duration-200">
            <Hash className="w-5 h-5 mr-2 inline-block" />
            Generate Title
          </button>
        </form>

        {/* Right Section: Generated Article */}
        <div className="w-1/2 bg-white p-6 rounded-xl shadow-md border border-gray-200 ">
          <div className="flex items-center gap-2 mb-4">
            <Hash className="w-5 h-5 mr-2 text-indigo-500" />
            <h1 className="text-lg font-semibold text-indigo-700">
              Generated Titles
            </h1>
          </div>

          <div className="text-gray-600">
            <p className="text-sm mb-2 ">
              Enter a topic and generate a title to see the result here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogTitle;
