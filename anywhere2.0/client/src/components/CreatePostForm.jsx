import React, { useState } from "react";

const CreatePostForm = () => {
  const [post, setPost] = useState({
    name: "",
    category: "",
    description: "",
    imageUrl: "",
    nsfw: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleCheck = () => {
    setPost({ ...post, nsfw: !post.nsfw });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4   ">
      <div className="font-bold mb-4 text-2xl">Create Post</div>
      <div className="rounded-md bg-gradient-to-r from-blue-700 to-blue-500 p-4 backdrop-blur-lg bg-opacity-40 border border-blue-300 border-opacity-20 w-3/4 flex flex-col items-center justify-center">
        <input
          name="name"
          value={post.name}
          onChange={handleChange}
          className="w-3/4 rounded p-2"
          type="text"
          placeholder="Post Name"
        />
        <input
          name="category"
          value={post.category}
          onChange={handleChange}
          className="w-3/4 rounded p-2 mt-2"
          type="text"
          placeholder="Category"
        />
        <textarea
          name="description"
          value={post.description}
          onChange={handleChange}
          className="w-3/4 rounded p-2 mt-2"
          placeholder="Description"
        />
        <input
          name="imageUrl"
          value={post.imageUrl}
          onChange={handleChange}
          className="w-3/4 rounded p-2 mt-2"
          type="text"
          placeholder="Image URL"
        />
        <div className="w-3/4 flex justify-start items-center mt-2">
          <input
            name="nsfw"
            checked={post.nsfw}
            onChange={handleCheck}
            className="mr-2"
            type="checkbox"
          />
          <label className="flex items-center">NSFW</label>
        </div>
        <button className="bg-blue-800 text-blue-100 rounded px-4 py-2 transition-all duration-200 hover:bg-blue-500 hover:text-white mt-2">
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreatePostForm;
