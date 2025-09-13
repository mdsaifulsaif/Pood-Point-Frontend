// PartnersMarqueeText.jsx
import React from "react";

export default function PartnersMarqueeText() {
  const partners = [
    "Shopify",
    "Stripe",
    "Amazon",
    "Segment",
    "HubSpot",
    "Notion",
    "Slack",
    "Zapier",
  ];

  // duplicate text for seamless loop
  const track = [...partners, ...partners];

  return (
    <section className="relative w-full bg-white py-10">
      {/* edge fade gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 from-white to-transparent bg-gradient-to-r z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 from-transparent to-white bg-gradient-to-l z-10" />

      <div className="overflow-hidden">
        <div
          className="group flex items-center gap-10 text-lg font-semibold text-gray-700 whitespace-nowrap"
          style={{
            animation: "scroll 25s linear infinite",
          }}
        >
          {track.map((name, i) => (
            <span
              key={i}
              className="flex-shrink-0 px-6 py-2 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        /* Pause on hover */
        section:hover .group { animation-play-state: paused; }
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .group { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
