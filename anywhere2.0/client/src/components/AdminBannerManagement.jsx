import React, { useState, useEffect } from "react";
import axios from "../config/axios";

export default function AdminBannerManagement() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [bannerData, setBannerData] = useState([]);
  const imagePath = "http://localhost:5000/files/";

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get("/admin/getbanner")
      .then((res) => {
        setBannerData(res.data);
      })
      .catch((err) => console.log(err));
  }

  const handleDelete = (id, name) => {
    axios
      .delete("/admin/deletebanner", { data: { id, name } })
      .then((req, res) => {
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("name", name);

    axios
      .post("/admin/addbanner", formData)
      .then((res) => {
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-red-500 to-rose-900 p-4 backdrop-blur-lg bg-opacity-40 border border-blue-300 border-opacity-20">
        <div className="flex  flex-col gap-2 justify-between md:flex-row items-center">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded p-2 "
            type="text"
            placeholder="name"
          />
          <input
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full rounded p-2 "
            type="file"
            placeholder="Add file"
          />

          <button onClick={handleUpload} className="red-gradient-btn">
            Submit
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="bg-gradient-to-r from-red-500 to-rose-900 p-4 backdrop-blur-lg bg-opacity-40 border border-blue-300 border-opacity-20 text-white">
          Existing Banners
        </h2>
        <div className="mt-2 space-y-4">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bannerData.map((banner, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{banner.name}</td>
                  <td className="border px-4 py-2">
                    <img
                      className="w-1/4 rounded-md shadow"
                      src={`${imagePath}${banner.image}`}
                      alt={banner.name}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="red-gradient-btn"
                      onClick={() => {
                        handleDelete(banner._id, banner.image);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
