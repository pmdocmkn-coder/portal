import React from 'react';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, className }) => {
  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className={`w-full h-full object-cover ${className}`}
    />
  );
};
