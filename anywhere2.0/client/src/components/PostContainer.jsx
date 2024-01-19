// PostContainer.js
import React, { useState } from "react";

const PostContainer = ({ value, onClick }) => {
  const [blurStatus, setBlurStatus] = useState(true);

  const toggleBlur = (event) => {
    event.stopPropagation();
    setBlurStatus(!blurStatus);
  };

  return (
    <div className="flex justify-center">
      <div className="w-3/4 ">
        <div className="m-8 " onClick={onClick}>
          <div className=" rounded-lg shadow-md p-4 bg-white transform transition-transform duration-500 hover:shadow-blue-400 mb-4">
            {value.nsfw ? (
              <p className="inline rounded-sm text-red-600 border border-red-800 text-sm mt-4 pr-1 pl-1">
                {value.nsfw ? "NSFW" : ""}
              </p>
            ) : (
              ""
            )}
            <div className="">
              <img
                onClick={toggleBlur}
                className={`w-full h-64 object-contain rounded-t-lg ${
                  blurStatus && value.nsfw ? "blur-lg" : ""
                }`}
                src={value.imageUrl}
                alt={value.name}
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{value.name}</h2>
              <p className="text-gray-600 text-base mb-2">{value.category}</p>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
