import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getDrafts, getPublishedBlogs } from "../../utils/api/adminApi/blogs.api";

export default function ProfilePage() {
  const { user } = useAuth();
  const [publishedCount, setPublishedCount] = useState<number | null>(null);
  const [draftsCount, setDraftsCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [published, drafts] = await Promise.all([
          getPublishedBlogs(),
          getDrafts(),
        ]);
        setPublishedCount(published.length);
        setDraftsCount(drafts.length);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1F0954] px-8 py-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-[#1F0954]">Profile</h1>
        <p className="text-gray-400 mt-1 text-sm">Your account details</p>
      </div>

      {/* Profile Card */}
      <div className="max-w-lg bg-white border border-gray-100 rounded-2xl shadow-sm p-8 flex flex-col items-center gap-4">

        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-purple-300 text-[#1F0954] flex items-center justify-center text-3xl font-bold">
          {user?.username?.charAt(0).toUpperCase() ?? "?"}
        </div>

        {/* Name & Email */}
        <div className="text-center">
          <p className="text-2xl font-bold text-[#1F0954]">{user?.username}</p>
          <p className="text-gray-400 text-sm mt-1">{user?.email}</p>
        </div>

        <div className="w-full border-t border-gray-100 my-2" />

        {/* Stats — placeholder for now */}
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center bg-purple-50 rounded-xl py-5">
            <span className="text-3xl font-bold text-[#1F0954]">
              {publishedCount ?? "—"}
            </span>
            <span className="text-xs text-gray-400 mt-1">Published Blogs</span>
          </div>
          <div className="flex flex-col items-center bg-purple-50 rounded-xl py-5">
            <span className="text-3xl font-bold text-[#1F0954]">
              {draftsCount ?? "—"}
            </span>
            <span className="text-xs text-gray-400 mt-1">Drafts</span>
          </div>
        </div>

      </div>
    </div>
  );
}