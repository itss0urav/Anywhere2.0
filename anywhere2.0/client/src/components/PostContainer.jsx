import React from "react";

const PostContainer = () => {
  return (
    <div>
      <div className="m-8">
        <div
          className="rounded-lg shadow-md p-4 bg-white transform transition-transform duration-500 hover:shadow-blue-400 mb-4" // Add 'mb-4' here
        >
          {post.nsfw ? (
            <p className="inline rounded-sm  text-red-600 border border-red-800 text-sm mt-4 pr-1 pl-1">
              {post.nsfw ? "NSFW" : ""}
            </p>
          ) : (
            ""
          )}
          <img
            onClick={toggleBlur}
            className={`w-full h-64 object-contain rounded-t-lg ${
              blurStatus && post.nsfw ? "blur-lg" : ""
            }`}
            src={post.imageUrl}
            alt={post.name}
          />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{post.name}</h2>
            <p className="text-gray-600 text-base mb-2">{post.category}</p>
            <p className="text-gray-600 text-sm">{post.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
