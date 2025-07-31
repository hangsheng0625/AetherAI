import React, { useState } from "react";
import { Sparkles, Edit, Hash, Copy, RefreshCw } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

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

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsGenerating(true);
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`;
      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setGeneratedTitles(
          data.content.split("\n").filter((line) => line.trim())
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (title) => {
    navigator.clipboard.writeText(title);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmitHandler(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="text-blue-500 w-8 h-8" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI Blog Title Generator
            </h1>
          </div>
          <p className="text-gray-600">
            Create compelling blog titles that capture attention and drive
            engagement
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="space-y-6">
              {/* Keyword Input */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700">
                  Enter Your Topic or Keyword
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                  placeholder="e.g., productivity, cooking, travel..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>

              {/* Category Selection */}
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
                      className={`p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                        selectedCategory === item
                          ? "bg-blue-500 border-blue-500 text-white shadow-md scale-105"
                          : "border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700"
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
                className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

          {/* Output Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Hash className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                Generated Titles
              </h2>
            </div>

            {generatedTitles.length === 0 ? (
              <div className="text-gray-600 flex items-center justify-center h-32 sm:h-48 lg:h-64">
                <p className="text-sm sm:text-base text-center px-4">
                  {isGenerating
                    ? "Generating your blog titles..."
                    : "Enter a topic and generate titles to see the result here."}
                </p>
              </div>
            ) : (
              <div className="h-64 sm:h-80 lg:h-96 overflow-y-auto text-sm sm:text-base text-slate-600 bg-gray-50 rounded-lg p-3 sm:p-4">
                <div className="reset-tw whitespace-pre-wrap leading-relaxed">
                  <Markdown>{generatedTitles.join("\n")}</Markdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogTitle;