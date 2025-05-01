import VideoPlayerCard from "../components/VideoPlayerCard";

const videos = [
  { videoId: "video1", src: "/sampleVideo1.mp4" },
  { videoId: "video2", src: "/sampleVideo2.mp4" },
  { videoId: "video3", src: "/sampleVideo3.mp4" },
  { videoId: "video4", src: "/sampleVideo4.mp4" },
];

const VideoGallery = () => {
  const userId = "Akshay123";

  return (
    <div className="min-h-screen p-6 flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Video Gallery
      </h1>
      <div className="w-full flex flex-wrap">
        {videos.map((video) => (
          <VideoPlayerCard
            key={video.videoId}
            userId={userId}
            videoId={video.videoId}
            videoSrc={video.src}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
