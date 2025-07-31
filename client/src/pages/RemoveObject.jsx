import React, { useState } from "react";
import { Sparkles, Image, Upload, Trash2, RefreshCw, Scissors, Download } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState(null);
  const [object, setObject] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [content, setContent] = useState("");
  
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsProcessing(true);
      
      if (!object.trim()) {
        toast.error('Please describe the object to remove');
        return;
      }

      const formData = new FormData();
      formData.append('image', input);
      formData.append('object', object);

      const { data } = await axios.post(
        "/api/ai/remove-image-object",
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput(file);
      setContent(""); // Clear previous result when new file is selected
    }
  };

  const removeImage = () => {
    setInput(null);
    setObject("");
    setContent("");
    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";
  };

  const downloadImage = () => {
    if (content) {
      const link = document.createElement('a');
      link.href = content;
      link.download = 'object-removed.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="text-blue-500 w-7 h-7" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI Object Remover
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Upload an image and remove unwanted objects with AI.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upload Card */}
          <form
            onSubmit={onSubmitHandler}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-6"
          >
            <div>
              <label
                htmlFor="fileInput"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Upload an Image
              </label>
              <div className="relative">
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="w-full border-2 border-dashed border-gray-300 p-6 rounded-xl opacity-0 absolute z-10 inset-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <div className="border-2 border-dashed border-gray-300 p-6 rounded-xl flex flex-col items-center justify-center text-center text-gray-500 pointer-events-none bg-white">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm">
                    {input ? input.name : "Click to upload or drag & drop"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG, JPEG up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Describe the Object to Remove
              </label>
              <textarea
                className="border-2 border-gray-300 p-4 rounded-xl w-full focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 resize-none"
                onChange={(e) => setObject(e.target.value)}
                value={object}
                rows={3}
                placeholder="e.g., person, car, building, tree..."
              />
            </div>

            {/* Process Button */}
            <button
              type="submit"
              disabled={isProcessing || !input || !object.trim()}
              className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Scissors className="w-5 h-5" />
                  Remove Object
                </>
              )}
            </button>

            {input && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={removeImage}
                  className="text-sm text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition-all flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove Image
                </button>
              </div>
            )}
          </form>

          {/* Original Image Preview */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Image className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                Original Image
              </h2>
            </div>

            {input ? (
              <div className="w-full h-80 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200">
                <img
                  src={URL.createObjectURL(input)}
                  alt="Original"
                  className="object-contain max-h-full max-w-full rounded"
                />
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Image className="w-10 h-10 text-blue-400" />
                </div>
                <p className="text-gray-500 mb-2">No image uploaded yet</p>
                <p className="text-sm text-gray-400">
                  Upload an image to see the preview here
                </p>
              </div>
            )}
          </div>

          {/* Processed Result */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Scissors className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                Object Removed
              </h2>
            </div>

            {content ? (
              <div className="space-y-4">
                <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200 relative">
                  {/* Checkerboard pattern to show transparency */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='%23000' fill-opacity='0.1'%3e%3crect x='0' y='0' width='10' height='10'/%3e%3crect x='10' y='10' width='10' height='10'/%3e%3c/g%3e%3c/svg%3e")`,
                    backgroundSize: '20px 20px'
                  }}></div>
                  <img
                    src={content}
                    alt="Object Removed"
                    className="object-contain max-h-full max-w-full rounded relative z-10"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={downloadImage}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Scissors className="w-10 h-10 text-green-400" />
                </div>
                <p className="text-gray-500 mb-2">
                  {isProcessing ? "Processing your image..." : "Processed image will appear here"}
                </p>
                <p className="text-sm text-gray-400">
                  {isProcessing ? "Please wait while we remove the object" : "Upload an image and describe the object to remove"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveObject;