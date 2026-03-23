import Image from "next/image";
import { Edit } from "@/data/mockData";
import { Heart, Play } from "lucide-react";

export default function EditCard({ edit }: { edit: Edit }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 transition-all hover:border-zinc-700">
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <Image
          src={edit.thumbnailUrl}
          alt={edit.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Play className="h-6 w-6 text-white fill-white ml-1" />
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 text-lg font-semibold text-zinc-100">{edit.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{edit.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
              {edit.editorName.charAt(0)}
            </div>
            <span className="text-sm font-medium text-zinc-300">{edit.editorName}</span>
          </div>

          <div className="flex items-center space-x-1 text-zinc-400">
            <Heart className="h-4 w-4" />
            <span className="text-xs font-medium">{edit.likes.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}