import { Edit } from "@/lib/actions";
import { X, Heart, Eye, Share2 } from "lucide-react";

type VideoModalProps = {
  edit: Edit;
  onClose: () => void;
};

export default function VideoModal({ edit, onClose }: VideoModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl flex flex-col md:flex-row">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black md:w-2/3 flex-shrink-0">
          <video
            src={edit.videoUrl}
            controls
            autoPlay
            className="h-full w-full object-contain"
          />
        </div>

        {/* Details Sidebar */}
        <div className="flex w-full flex-col p-6 md:w-1/3 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center space-x-3 pb-4 border-b border-zinc-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white shrink-0">
              {edit.editorName?.charAt(0) || "U"}
            </div>
            <div>
              <p className="font-medium text-white">{edit.editorName || "Unknown User"}</p>
              <p className="text-xs text-zinc-400">Published {new Date(edit.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="py-4 flex-1">
            <h2 className="text-xl font-bold text-white">{edit.title}</h2>
            <p className="mt-3 text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {edit.description || "No description provided."}
            </p>
          </div>

          <div className="pt-4 mt-auto border-t border-zinc-800 flex items-center justify-between">
            <div className="flex space-x-4">
              <button className="flex items-center space-x-1.5 text-zinc-400 hover:text-rose-500 transition-colors">
                <Heart className="h-5 w-5" />
                <span className="text-sm font-medium">{edit.likes.toLocaleString()}</span>
              </button>
              <div className="flex items-center space-x-1.5 text-zinc-400">
                <Eye className="h-5 w-5" />
                <span className="text-sm font-medium">{edit.views.toLocaleString()}</span>
              </div>
            </div>
            <button className="flex items-center space-x-1.5 text-zinc-400 hover:text-white transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}