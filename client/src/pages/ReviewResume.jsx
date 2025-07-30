import React, { useState } from "react";
import { Sparkles, FileTextIcon, Upload, Trash2, RefreshCw } from "lucide-react";

const ReviewResume = () => {
  const [input, setInput] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!input) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // You can replace this with actual review logic
    }, 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setInput(file);
  };

  const removeResume = () => {
    setInput(null);
    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="text-blue-500 w-7 h-7" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI Resume Reviewer
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Upload your resume and get feedback with AI.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="fileInput" className="block text-sm font-semibold text-gray-700 mb-3">
                  Upload Your Resume (PDF)
                </label>
                <div className="relative">
                  <input
                    id="fileInput"
                    type="file"
                    accept="application/pdf"
                    className="w-full border-2 border-dashed border-gray-300 p-6 rounded-xl opacity-0 absolute z-10 inset-0 cursor-pointer"
                    onChange={handleFileChange}
                    required
                  />
                  <div className="border-2 border-dashed border-gray-300 p-6 rounded-xl flex flex-col items-center justify-center text-center text-gray-500 pointer-events-none bg-white">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm">
                      {input ? input.name : "Click to upload or drag & drop"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Only PDF files supported
                    </p>
                  </div>
                </div>
              </div>

              {/* Process Button */}
              <button
                onClick={onSubmitHandler}
                disabled={isProcessing || !input}
                className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Review Resume
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <FileTextIcon className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">Resume Preview</h2>
            </div>

            {input ? (
              <div className="space-y-4">
                <div className="w-full h-80 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200">
                  <p className="text-gray-500 px-4 text-center">
                    Preview not available. PDF uploaded: <br />
                    <strong>{input.name}</strong>
                  </p>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={removeResume}
                    className="text-sm text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition-all flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove Resume
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileTextIcon className="w-10 h-10 text-blue-400" />
                </div>
                <p className="text-gray-500 mb-2">No resume uploaded yet</p>
                <p className="text-sm text-gray-400">
                  Upload a resume to see the preview here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewResume;
