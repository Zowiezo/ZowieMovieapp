import React from "react";
import { maxWidth } from "../../../styles/index.js";
import { cn } from "../../../utils/helper.js";

const Videos = ({ videos }) => {
  // Ensure that `videos` is an array, if not, return a fallback message
  if (!Array.isArray(videos)) {
    return <p>No videos available</p>;
  }

  // Slice to show only the first 2 videos (can be adjusted)
  const youtubeVideos = videos.slice(0, 2);

  return (
    <section
      className={cn(
        maxWidth,
        `flex flex-col lg:gap-16 md:gap-14 sm:gap-12 xs:gap-10 gap-8 lg:py-24 md:py-16 sm:py-12 xs:py-10 py-8`
      )}
    >
      {/* Check if there are any videos */}
      {youtubeVideos.length === 0 ? (
        <p>No videos available</p>
      ) : (
        youtubeVideos.map((video) => {
          // Ensure that each video contains a valid key for the iframe
          if (!video.key) {
            return (
              <div key={video.id} className="text-center">
                <p>No trailer available for {video.name}</p>
              </div>
            );
          }

          return (
            <div
              key={video.id}
              className="sm:w-[80%] w-[90%] mx-auto flex flex-col md:gap-2 sm:gap-[6px] xs:gap-1 gap-[2px]"
            >
              <h2 className="dark:text-secColor text-gray-800 font-nunito font-semibold lg:text-[24px] md:text-[22.75px] sm:text-[18.75px] xs:text-[18px] text-[16.75px] mb-1">
                {video.name}
              </h2>
              <div className="w-[100%] lg:h-[480px] md:h-[420px] sm:h-[320px] h-[210px] rounded-md mx-auto shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${video.key}?enablejsapi=1&origin=${window.location.origin}`}
                  title="trailer"
                  width="100%"
                  height="100%"
                  className="rounded-md"
                  allowFullScreen
                />
              </div>
            </div>
          );
        })
      )}
    </section>
  );
};

export default Videos;
