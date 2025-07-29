import React from "react";
import { AiToolsData, assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";


const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  return (
    <div className="px-4 sm:px-20 xl:px-32 my-24">
      <div className="text-center">
        <h2 className="text-slate-700 text-[42px] font-semibold">
          Powerful AI tools
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Explore our range of AI tools designed to enhance your productivity
          and creativity.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => user && navigate(tool.path)}
          >
            <tool.Icon
              className="w-12 h-12 p-3 text-white rounded-xl cursor-pointer"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            ></tool.Icon>

            <h3 className="mt-6 mb-3 text-lg font-semibold">{tool.title}</h3>
            <p className="text-gray-500 text-sm max-w-[95%]" >{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTools;
