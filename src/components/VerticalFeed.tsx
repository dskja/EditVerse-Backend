"use client";

import { useEffect, useRef, useState } from "react";
import { Edit } from "@/lib/actions";
import { Heart, MessageCircle, Share2, Play } from "lucide-react";

export default function VerticalFeed({ edits }: { edits: Edit[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.6, // Trigger when 60% of the video is visible
      }
    );

    const elements = document.querySelectorAll(".video-snap-item");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [edits]);

  if (edits.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center text-zinc-500">
        No edits found. Be the first to upload!
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-64px)] w-full overflow-y-scroll snap-y snap-mandatory bg-black scrollbar-hide"
      style={{ scrollBehavior: "smooth" }}
    >
      {edits.map((edit, index) => (
        <VideoItem
          key={edit.id}
          edit={edit}
          index={index}
          isActive={index === activeIndex}
        />
      ))}
    </div>
  );
}

function VideoItem({ edit, index, isActive }: { edit: Edit, index: number, isActive: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      data-index={index}
      className="video-snap-item relative h-full w-full snap-start snap-always flex justify-center items-center bg-zinc-900"
    >
      {/* Video Container */}
      <div
        className="relative h-full w-full max-w-[500px] cursor-pointer bg-black overflow-hidden"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={edit.videoUrl}
          poster={edit.thumbnailUrl}
          className="h-full w-full object-cover"
          loop
          playsInline
          muted={false}
        />

        {/* Play Icon Overlay (visible when paused) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="rounded-full bg-black/50 p-4 text-white backdrop-blur-sm transition-transform hover:scale-110">
              <Play className="h-12 w-12 fill-current" />
            </div>
          </div>
        )}

        {/* Info Overlay (Bottom) */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pt-20">
          <div className="flex items-end justify-between">
            <div className="flex-1 pr-12">
              <h3 className="text-xl font-bold text-white mb-2">{edit.title}</h3>
              <p className="text-sm font-medium text-indigo-400 mb-2">@{edit.editorName || 'unknown_editor'}</p>
              <p className="text-sm text-zinc-300 line-clamp-2">{edit.description}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons (Right Side) */}
        <div className="absolute bottom-20 right-4 flex flex-col items-center gap-6">
          <ActionButton icon={<Heart className="h-7 w-7" />} label={edit.likes.toString()} />
          <ActionButton icon={<MessageCircle className="h-7 w-7" />} label="0" />
          <ActionButton icon={<Share2 className="h-7 w-7" />} label="Share" />
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="group flex flex-col items-center gap-1 transition-transform hover:scale-110">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800/80 text-white backdrop-blur-sm transition-colors group-hover:bg-indigo-500/80">
        {icon}
      </div>
      <span className="text-xs font-semibold text-white drop-shadow-md">{label}</span>
    </button>
  );
}
