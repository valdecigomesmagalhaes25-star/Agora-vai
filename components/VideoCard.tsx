
import React, { useRef, useState, useEffect } from 'react';
import { Video } from '../types';
import { Heart, MessageCircle, Share2, Music, UserPlus, Play, Pause } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  active: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, active }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (active) {
      videoRef.current?.play().catch(() => {
          // Auto-play might be blocked
      });
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [active]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="video-item relative h-screen w-full flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        src={video.url}
        loop
        playsInline
        className="h-full w-full object-cover max-w-md md:max-w-lg lg:max-w-xl shadow-2xl"
        onClick={togglePlay}
      />

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Play className="w-16 h-16 text-white/50" fill="currentColor" />
        </div>
      )}

      {/* Side Actions */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-10">
        <div className="flex flex-col items-center group">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`p-3 rounded-full transition-all duration-300 ${isLiked ? 'bg-red-500 scale-110' : 'bg-white/10 hover:bg-white/20'}`}
          >
            <Heart size={28} fill={isLiked ? "white" : "none"} strokeWidth={isLiked ? 0 : 2} />
          </button>
          <span className="text-sm font-medium mt-1">{video.likes.toLocaleString()}</span>
        </div>

        <div className="flex flex-col items-center">
          <button className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors">
            <MessageCircle size={28} />
          </button>
          <span className="text-sm font-medium mt-1">{video.comments.toLocaleString()}</span>
        </div>

        <div className="flex flex-col items-center">
          <button className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors">
            <Share2 size={28} />
          </button>
          <span className="text-sm font-medium mt-1">{video.shares.toLocaleString()}</span>
        </div>

        <div className="relative mt-2">
          <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden animate-spin-slow">
            <img src={video.user.avatar} alt="music disk" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-violet-600 rounded-full p-1 border border-black">
            <Music size={12} />
          </div>
        </div>
      </div>

      {/* Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-28 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-4 pointer-events-auto">
            <img src={video.user.avatar} className="w-10 h-10 rounded-full border border-white/20" alt={video.user.name} />
            <div>
              <h3 className="font-bold flex items-center gap-2">
                {video.user.handle}
                <button className="text-xs bg-violet-600 hover:bg-violet-700 px-3 py-1 rounded-full flex items-center gap-1 transition-colors">
                  <UserPlus size={12} /> Seguir
                </button>
              </h3>
            </div>
          </div>
          <p className="text-sm text-gray-200 line-clamp-2 mb-3 pointer-events-auto">
            {video.description}
          </p>
          <div className="flex items-center gap-2 text-sm text-violet-300 pointer-events-auto">
            <Music size={14} className="animate-pulse" />
            <div className="overflow-hidden whitespace-nowrap">
              <span className="inline-block animate-marquee">{video.music}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
