// components/Loader.tsx
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
      <div className="relative flex space-x-2">
        <div className="w-5 h-5 bg-red-600 rounded-full animate-bounce"></div>
        <div className="w-5 h-5 bg-red-600  rounded-full animate-bounce delay-200"></div>
        <div className="w-5 h-5 bg-red-600  rounded-full animate-bounce delay-400"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 border-4 border-t-transparent border-red-600  border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
