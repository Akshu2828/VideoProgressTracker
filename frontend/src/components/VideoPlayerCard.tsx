import { useRef } from "react";
import { useVideoTracker } from "../hooks/useVideoTracker";

type Props = {
  userId: string;
  videoId: string;
  videoSrc: string;
};

const VideoPlayerCard = ({ userId, videoId, videoSrc }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { progress } = useVideoTracker(videoRef, userId, videoId);

  return (
    <div className=" p-4 w-full md:w-1/2 lg:w-1/3">
      <video
        ref={videoRef}
        width="100%"
        controls
        className="rounded shadow"
        src={videoSrc}
      />
      <div className="mt-2 text-sm text-gray-700">
        Watched: {progress.toFixed(2)}%
      </div>
    </div>
  );
};

export default VideoPlayerCard;
