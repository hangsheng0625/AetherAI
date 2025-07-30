import React from "react";
import { useState } from "react";
import { Sparkles, Edit, Hash, Copy, RefreshCw } from "lucide-react";

const BlogTitle = () => {
  const blogCategories = [
    "General",
    "Technology", 
    "Health",
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
  const [generatedTitles, setGeneratedTitles] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock title generation function
  const generateTitles = (keyword, category) => {
    const templates = [
      `10 Amazing ${keyword} Tips for ${category} Enthusiasts`,
      `The Ultimate Guide to ${keyword} in ${category}`,
      `How ${keyword} is Revolutionizing ${category}`,
      `${keyword}: The Secret to Better ${category}`,
      `Why ${keyword} Matters More Than Ever in ${category}`,
    ];
    return templates;
  };

  const onSubmitHandler = () => {
    if (!input.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call delay
    setTimeout(() => {
      const titles = generateTitles(input, selectedCategory);
      setGeneratedTitles(titles);
      setIsGenerating(false);
    }, 1000);
  };

  const copyToClipboard = (title) => {
    navigator.clipboard.writeText(title);
    // You could add a toast notification here
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmitHandler();
    }
  };

  return (
    <div className=" bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="text-indigo-500 w-8 h-8" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Blog Title Generator
            </h1>
          </div>
          <p className="text-gray-600">Create compelling blog titles that capture attention and drive engagement</p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Section: Input Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="space-y-6">
              {/* Keyword Input */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700">
                  Enter Your Topic or Keyword
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
                  placeholder="e.g., productivity, cooking, travel..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>

              {/* Category Selection - Grid Layout */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700">
                  Select Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {blogCategories.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSelectedCategory(item)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                        selectedCategory === item
                          ? "bg-indigo-500 border-indigo-500 text-white shadow-md transform scale-105"
                          : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button 
                onClick={onSubmitHandler}
                disabled={isGenerating || !input.trim()}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Hash className="w-5 h-5" />
                    Generate Titles
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Section: Generated Titles */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Hash className="w-6 h-6 text-indigo-500" />
              <h2 className="text-xl font-semibold text-gray-800">Generated Titles</h2>
            </div>

            {generatedTitles.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Edit className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-2">No titles generated yet</p>
                <p className="text-sm text-gray-400">Enter a topic and click "Generate Titles" to see results</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {generatedTitles.map((title, index) => (
                  <div
                    key={index}
                    className="group p-4 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-gray-800 leading-relaxed flex-1">{title}</p>
                      <button
                        onClick={() => copyToClipboard(title)}
                        className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-indigo-100 transition-all duration-200 flex-shrink-0"
                        title="Copy to clipboard"
                      >
                        <Copy className="w-4 h-4 text-indigo-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogTitle;