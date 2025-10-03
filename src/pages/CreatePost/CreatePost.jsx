import React from "react";

function CreatePost() {
  return (
    <div className="flex items-center justify-center h-[70vh] px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          🚧 Feature in Progress
        </h2>
        <p className="text-gray-600 mb-4">
          The post creation option is not available right now. We’re working
          hard to bring it to you soon!
        </p>
        <p className="text-sm text-gray-400 italic">
          Thanks for your patience ✨
        </p>
      </div>
    </div>
  );
}

export default CreatePost;
