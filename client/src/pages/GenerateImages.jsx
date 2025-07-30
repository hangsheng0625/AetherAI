import React, { useState } from "react";
import { Sparkles, Image, RefreshCw } from "lucide-react";

const GenerateImages = () => {
  const ImageStyle = [
    "Realistic", "Cartoon", "Abstract", "3D Render", "Anime",
    "Vintage", "Ghibli", "Fantasy", "Cyberpunk", "Nature",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publishedImage, setPublishedImage] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // ✅ Prevent form from reloading

    if (!input.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
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
              AI Image Generator
            </h1>
          </div>
          <p className="text-gray-600">
            Transform your ideas into stunning visual art with AI
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Section: Input Form */}
          <form
            onSubmit={onSubmitHandler}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6"
          >
            {/* Description Input */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">
                Describe Your Image
              </label>
              <textarea
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 resize-none"
                placeholder="Describe the image you want to generate..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                rows={4}
              />
              <p className="text-xs text-gray-500 mt-1">
                Press Ctrl+Enter to generate
              </p>
            </div>

            {/* Style Selection */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">
                Choose Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ImageStyle.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSelectedStyle(item)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                      selectedStyle === item
                        ? "bg-blue-500 border-blue-500 text-white shadow-md transform scale-105"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Public Toggle */}
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
              <input
                type="checkbox"
                id="publishToggle"
                checked={publishedImage}
                onChange={(e) => setPublishedImage(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
              />
              <label
                htmlFor="publishToggle"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Make this image public
              </label>
            </div>

            {/* Generate Button */}
            <button
              type="submit"
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
                  <Image className="w-5 h-5" />
                  Generate Image
                </>
              )}
            </button>
          </form>

          {/* Right Section: Generated Image Display */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Image className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                Generated Images
              </h2>
            </div>

            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Image className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-2">No images generated yet</p>
              <p className="text-sm text-gray-400">
                Enter a description and click "Generate Image" to see results
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;
