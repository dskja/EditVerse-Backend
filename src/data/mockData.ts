export type Edit = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  editorId: string;
  editorName: string;
  likes: number;
  views: number;
  createdAt: string;
};

export const MOCK_EDITS: Edit[] = [
  {
    id: "1",
    title: "Cyberpunk City Sync",
    description: "A fast-paced sync edit using Cyberpunk 2077 footage.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop",
    editorId: "e1",
    editorName: "NeonVFX",
    likes: 1240,
    views: 8500,
    createdAt: "2023-10-25T10:00:00Z",
  },
  {
    id: "2",
    title: "Nature's Rhythm",
    description: "Relaxing aesthetic edit of nature clips.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop",
    editorId: "e2",
    editorName: "AuraEdits",
    likes: 850,
    views: 4200,
    createdAt: "2023-10-26T14:30:00Z",
  },
  {
    id: "3",
    title: "Anime AMV - Action Mix",
    description: "High energy anime combat mix.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1541562232579-512a21360020?w=800&auto=format&fit=crop",
    editorId: "e3",
    editorName: "OtakuCuts",
    likes: 3420,
    views: 15600,
    createdAt: "2023-10-27T09:15:00Z",
  },
  {
    id: "4",
    title: "Cars Cinematic",
    description: "Night drive cinematic edit.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop",
    editorId: "e4",
    editorName: "GearHead",
    likes: 560,
    views: 2100,
    createdAt: "2023-10-28T18:45:00Z",
  },
];
