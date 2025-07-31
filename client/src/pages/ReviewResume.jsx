import React, { useState } from "react";
import { Sparkles, FileTextIcon, Upload, Trash2, RefreshCw, MessageSquare, Copy } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [input, setInput] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsProcessing(true);

      const formData = new FormData();
      formData.append('resume', input); // Changed from 'image' to 'resume'

      const { data } = await axios.post(
        "/api/ai/resume-review",
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

  const removeResume = () => {
    setInput(null);
    setContent("");
    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";
  };

  const copyToClipboard = () => {
    if (content) {
      navigator.clipboard.writeText(content);
      toast.success("Review copied to clipboard!");
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
              AI Resume Reviewer
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Upload your resume and get feedback with AI.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Upload Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 min-h-[500px]">
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
                    <MessageSquare className="w-5 h-5" />
                    Review Resume
                  </>
                )}
              </button>

              {input && (
                <div className="flex justify-center">
                  <button
                    onClick={removeResume}
                    className="text-sm text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition-all flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove Resume
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Resume Preview Card */}
          {/* <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <FileTextIcon className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">Resume Preview</h2>
            </div>

            {input ? (
              <div className="w-full h-80 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200">
                <div className="text-center p-6">
                  <FileTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium mb-2">PDF Uploaded</p>
                  <p className="text-sm text-gray-500 break-all">
                    <strong>{input.name}</strong>
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Size: {(input.size / 1024 / 1024).toFixed(2)} MB
                  </p>
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
          </div> */}

          {/* AI Review Results */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 min-h-[500px]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-800">AI Review</h2>
              </div>
              {content && (
                <button
                  onClick={copyToClipboard}
                  className="text-sm text-blue-500 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-all flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              )}
            </div>

            {content ? (
              <div className="h-80 overflow-y-auto text-sm text-slate-600 bg-gray-50 rounded-lg p-4">
                <div className="reset-tw whitespace-pre-wrap leading-relaxed">
                  <Markdown>{content}</Markdown>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-10 h-10 text-green-400" />
                </div>
                <p className="text-gray-500 mb-2">
                  {isProcessing ? "Analyzing your resume..." : "Review results will appear here"}
                </p>
                <p className="text-sm text-gray-400">
                  {isProcessing ? "Please wait while AI reviews your resume" : "Upload a resume and click 'Review Resume' to get feedback"}
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