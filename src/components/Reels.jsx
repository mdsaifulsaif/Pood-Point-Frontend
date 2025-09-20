import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";

function Reels() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reel", {
          withCredentials: true,
        });
        setReels(res.data.reelItems);
        console.log(res.data.reelItems);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchReels();
  }, []);

  useEffect(() => {
    if (!reels.length) return;

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
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [reels]);

  // like api call

  async function likevideo(item) {
    const response = await axios.post(
      "http://localhost:5000/api/reel/like",
      { reelId: item }, // backend er sate match korbe
      { withCredentials: true }
    );

    console.log(response.data.like);
  }

  // async function likevideo(item) {
  //   const response = await axios.post(
  //     "http://localhost:5000/api/reel/like",
  //     { reelID: item },
  //     { withCredentials: true }
  //   );

  //   console.log(response.data.Link);
  // }

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!reels.length) return <p className="text-center mt-10">No videos</p>;

  return (
    <div className="flex flex-col gap-6">
      {reels.map((reel, index) => (
        <article
          key={reel._id}
          className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200"
        >
          {/* Header */}
          <header className="flex items-center gap-3 p-4">
            <Link to={`/reels/profile/${reel.createBy}`}>
              <div className="w-10 h-10 rounded-full bg-gray-600" />
            </Link>
            <div>
              <div className="font-semibold">{reel.name}</div>
              <div className="text-xs text-gray-400">Dhaka, Bangladesh</div>
            </div>
            <button className="ml-auto text-sm">•••</button>
          </header>

          {/* Video */}
          <div className="w-full md:w-[400px] aspect-[5/7] bg-black">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={reel.video}
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
                <button onClick={() => likevideo(reel._id)} className="text-lg">
                  ❤️
                </button>
                <button className="text-lg">💬</button>
                <button className="text-lg">↗️</button>
              </div>
              <div className="ml-auto text-sm text-gray-500">
                {reel.likeCount} likes
              </div>
            </div>

            {/* Caption */}
            <p className="mt-3 text-sm">
              <span className="font-semibold mr-2">{reel.name}</span>
              {reel.description}
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
