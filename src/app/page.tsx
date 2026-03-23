import { getEdits } from "@/lib/actions";
import VerticalFeed from "@/components/VerticalFeed";

export default async function Home() {
  const edits = await getEdits();

  return (
    <main className="h-full w-full bg-black">
      <VerticalFeed edits={edits} />
    </main>
  );
}
