import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
  const videoUrl = "https://www.youtube.com/watch?v=VBKNoLcj8jA"; // URL video YouTube
  return (
    <div>
      <ReactPlayer url={videoUrl} width="100%"  />
    </div>
  );
};

export default VideoPlayer;
