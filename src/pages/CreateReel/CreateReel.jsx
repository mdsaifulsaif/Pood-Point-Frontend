import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";

const CreateReel = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !video) {
      toast.error("Please fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("video", video);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/reel",
        formData,
        { withCredentials: true },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Reel added successful");
      navigate("/reels");
      setName("");
      setDescription("");
      setVideo(null);
    } catch (err) {
      console.error(err);
      alert("Error uploading food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[87vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Upload New Food Reel 🍴
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Name
            </label>
            <input
              type="text"
              placeholder="Enter food name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Write a short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Video
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="w-full border border-gray-300 p-3 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-teal-500 text-white py-3 rounded-lg font-semibold shadow hover:bg-teal-600 transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateReel;
