import { MOCK_EDITS } from "@/data/mockData";
import EditCard from "@/components/EditCard";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Discover <span className="text-indigo-500">Masterpieces</span>
        </h1>
        <p className="mt-4 text-lg text-zinc-400 max-w-2xl">
          Explore the latest and greatest edits from top creators around the globe. Watch, get inspired, and share your own.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {MOCK_EDITS.map((edit) => (
          <EditCard key={edit.id} edit={edit} />
        ))}
      </div>
    </div>
  );
}
