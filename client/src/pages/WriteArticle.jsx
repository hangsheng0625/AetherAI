import React, { useState } from "react";
import { Edit, Sparkles } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { data } from "react-router-dom";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articleLengths = [
    { length: 800, label: "Short (500–800 words)" },
    { length: 1200, label: "Medium (800–1200 words)" },
    { length: 2000, label: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLengths[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions

    try {
      setLoading(true);
      const prompt = `Write an article about ${input} with approximately ${selectedLength.length} words`;
      const { data } = await axios.post(
        "api/ai/generate-article",
        { prompt, length: selectedLength.length },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Sparkles className="text-blue-500 w-8 h-8" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI Article Generator
          </h1>
        </div>
        <p className="text-gray-600">
          Unleash your creativity with AI-powered article ideas tailored to your
          niche.{" "}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 max-w-7xl mx-auto">
        {/* Left Section: Article Configuration */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full lg:w-1/2 bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200 space-y-4 sm:space-y-6"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="text-indigo-500 w-5 h-5 sm:w-6 sm:h-6" />
            <h1 className="text-lg sm:text-xl font-semibold text-indigo-700">
              Article Configuration
            </h1>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Article Topic
            </label>
            <input
              type="text"
              className="border border-gray-300 p-2 sm:p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm sm:text-base"
              placeholder="The future of artificial intelligence is..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Article Length
            </label>
            <div className="flex flex-col gap-2">
              {articleLengths.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedLength(item)}
                  disabled={loading}
                  className={`text-left p-2 sm:p-3 rounded-md border transition text-sm sm:text-base ${
                    selectedLength.length === item.length
                      ? "bg-indigo-100 border-indigo-500 text-indigo-800 font-medium"
                      : "border-gray-300 hover:bg-gray-100"
                  } ${
                    loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className={`w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base font-medium transition-all duration-200 ${
              loading || !input.trim()
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer hover:shadow-lg transform hover:scale-105"
            }`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Generate Article</span>
              </>
            )}
          </button>
        </form>

        {/* Right Section: Generated Article */}
        <div className="w-full lg:w-1/2 bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Edit className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
            <h1 className="text-lg sm:text-xl font-semibold text-indigo-700">
              Generated Article
            </h1>
          </div>

          {!content ? (
            <div className="text-gray-600 flex items-center justify-center h-32 sm:h-48 lg:h-64">
              <p className="text-sm sm:text-base text-center px-4">
                {loading
                  ? "Generating your article..."
                  : "Enter a topic and generate an article to see the result here."}
              </p>
            </div>
          ) : (
            <div className="mt-3 h-64 sm:h-80 lg:h-96 overflow-y-auto text-sm sm:text-base text-slate-600 bg-gray-50 rounded-lg p-3 sm:p-4">
              <div className="reset-tw whitespace-pre-wrap leading-relaxed">
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;
