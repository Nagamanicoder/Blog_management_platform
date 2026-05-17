import { useEffect, useState } from "react";
import ContentCard from "../../components/ContentCard";
import type { BlogItem } from "../../utils/api/adminApi/blogs.api";
import { getDrafts, deleteBlog } from "../../utils/api/adminApi/blogs.api";

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDraftsData = async () => {
      try {
        setLoading(true);
        const data = await getDrafts();
        setDrafts(data);
      } catch (err) {
        console.error("Failed to fetch drafts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDraftsData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteBlog(id);
      setDrafts((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1F0954] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

      {/* Header */}
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1F0954]">
          Drafts
        </h1>
        <p className="text-gray-400 mt-1 text-xs sm:text-sm">
          Your unpublished work lives here
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center mt-24">
          <span className="animate-pulse text-gray-400 text-sm">Loading drafts...</span>
        </div>
      ) : drafts.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 text-center px-4">
          <p className="text-lg sm:text-xl font-medium text-[#1F0954]">No drafts yet</p>
          <p className="text-xs sm:text-sm mt-1 text-gray-400">Start writing something amazing!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {drafts.map((draft) => (
            <ContentCard
              key={draft.id}
              id={draft.id}
              image={draft.image || ""}
              title={draft.title}
              onDeleteConfirm={handleDelete}
              showEdit={true}
              showDelete={true}
            />
          ))}
        </div>
      )}

    </div>
  );
}