"use client";

import { useState } from "react";
import { Upload as UploadIcon, X, Loader2 } from "lucide-react";
import { uploadEdit } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("video", file);
      formData.append("title", title);
      formData.append("description", description);

      await uploadEdit(formData);
      router.push("/profile");
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 h-full overflow-y-auto pt-24 pb-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Upload your Edit
        </h1>
        <p className="mt-3 text-zinc-400">
          Share your latest masterpiece with the EditVerse community.
        </p>
      </div>

      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Video File
            </label>

            {!file ? (
              <div
                className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-colors ${
                  dragActive
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-zinc-700 hover:border-zinc-500 bg-zinc-950/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="video/*"
                  onChange={handleChange}
                />
                <UploadIcon className="h-10 w-10 text-zinc-400 mb-4" />
                <p className="text-sm text-zinc-300 font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-zinc-500 mt-1">MP4, WebM or OGG (MAX. 50MB)</p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-zinc-950/50 border border-zinc-700 rounded-xl">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-indigo-500/20 text-indigo-400">
                    <UploadIcon className="h-5 w-5" />
                  </div>
                  <div className="truncate">
                    <p className="truncate text-sm font-medium text-zinc-200">{file.name}</p>
                    <p className="text-xs text-zinc-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="ml-4 rounded-full p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-zinc-300 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cyberpunk Cinematic"
              required
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950/50 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-zinc-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your edit..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950/50 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!file || !title || isUploading}
            className="w-full flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Publish Edit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}