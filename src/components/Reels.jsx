// export default Reels;
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function Reels() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/food/", {
          withCredentials: true,
        });
        setFoods(res.data.foodItems);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    if (!foods.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 } // video 70% visible holei play
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [foods]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!foods.length) return <p className="text-center mt-10">No videos</p>;

  return (
    <div className="flex flex-col gap-6">
      {foods.map((food, index) => (
        <article
          key={food._id}
          className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200"
        >
          {/* Header */}
          <header className="flex items-center gap-3 p-4">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div>
              <div className="font-semibold">{food.name}</div>
              <div className="text-xs text-gray-400">Dhaka, Bangladesh</div>
            </div>
            <button className="ml-auto text-sm">•••</button>
          </header>

          {/* Video */}
          <div className="w-full md:w-[400px] aspect-[4/5]   bg-black">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={food.video}
              className="w-full h-full object-cover block"
              loop
              muted
              playsInline
            />
          </div>

          {/* Actions + Likes */}
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-3">
                <button className="text-lg">❤️</button>
                <button className="text-lg">💬</button>
                <button className="text-lg">↗️</button>
              </div>
              <div className="ml-auto text-sm text-gray-500">12k likes</div>
            </div>

            {/* Caption */}
            <p className="mt-3 text-sm">
              <span className="font-semibold mr-2">{food.name}</span>
              {food.description}
            </p>

            {/* Comment box */}
            <div className="mt-3">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none"
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default Reels;
