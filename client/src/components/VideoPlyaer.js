import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div>
      <ReactPlayer
        url={videoUrl}
        controls // Optional: Show player controls
        width="100%" // Optional: Set player width
        height="auto" // Optional: Set player height
      />
    </div>
  );
};

export default VideoPlayer;
