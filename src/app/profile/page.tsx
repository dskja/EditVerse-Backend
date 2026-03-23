import { MOCK_EDITS } from "@/data/mockData";
import EditCard from "@/components/EditCard";
import { Settings, Users, Video } from "lucide-react";

export default function ProfilePage() {
  const userEdits = MOCK_EDITS.filter((edit) => edit.editorId === "e1");

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800">
        <div className="h-48 bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative px-6 pb-6 sm:px-10">
          <div className="-mt-16 flex flex-col sm:flex-row sm:items-end sm:space-x-5">
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-zinc-800 border-4 border-zinc-900 text-4xl font-bold text-white shadow-xl z-10">
              N
            </div>

            <div className="mt-6 sm:mt-0 sm:flex-1 sm:pb-2">
              <h1 className="text-3xl font-bold text-white">NeonVFX</h1>
              <p className="text-zinc-400">@neon_vfx</p>
            </div>

            <div className="mt-6 flex sm:mt-0 sm:pb-2 gap-3">
              <button className="flex items-center rounded-xl bg-zinc-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-700">
                Edit Profile
              </button>
              <button className="flex items-center rounded-xl bg-zinc-800 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-700">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-6 border-t border-zinc-800 pt-8 sm:max-w-md">
            <div>
              <div className="flex items-center text-sm font-medium text-zinc-400">
                <Video className="mr-1.5 h-4 w-4" />
                Edits
              </div>
              <p className="mt-1 text-2xl font-semibold text-white">12</p>
            </div>
            <div>
              <div className="flex items-center text-sm font-medium text-zinc-400">
                <Users className="mr-1.5 h-4 w-4" />
                Followers
              </div>
              <p className="mt-1 text-2xl font-semibold text-white">1.2k</p>
            </div>
            <div>
              <div className="flex items-center text-sm font-medium text-zinc-400">
                <Users className="mr-1.5 h-4 w-4" />
                Following
              </div>
              <p className="mt-1 text-2xl font-semibold text-white">84</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">My Edits</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {userEdits.map((edit) => (
            <EditCard key={edit.id} edit={edit} />
          ))}
          {userEdits.map((edit) => (
            <EditCard key={edit.id + "clone"} edit={{...edit, id: edit.id + "clone"}} />
          ))}
          {userEdits.map((edit) => (
            <EditCard key={edit.id + "clone2"} edit={{...edit, id: edit.id + "clone2"}} />
          ))}
        </div>
      </div>
    </div>
  );
}