import { useEffect, useState } from "react";
import ContentCard from "../../components/ContentCard";
import type { BlogItem } from "../../utils/api/adminApi/blogs.api";
import { getPublishedBlogs, deleteBlog } from "../../utils/api/adminApi/blogs.api";

export default function PublishedPage() {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getPublishedBlogs();
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch published blogs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteBlog(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1F0954] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

      {/* Header */}
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1F0954]">
          Published
        </h1>
        <p className="text-gray-400 mt-1 text-xs sm:text-sm">
          Your published blogs are live here
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center mt-24">
          <span className="animate-pulse text-gray-400 text-sm">Loading...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 text-center px-4">
          <p className="text-lg sm:text-xl font-medium text-[#1F0954]">
            No published blogs yet
          </p>
          <p className="text-xs sm:text-sm mt-1 text-gray-400">
            Publish your first blog to see it here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {items.map((item) => (
            <ContentCard
              key={item.id}
              id={item.id}
              image={item.image || ""}
              title={item.title}
              onDeleteConfirm={handleDelete}
              showEdit={false}
              showDelete={true}
              onClick={() => window.open(`/blog/${item.id}`, "_blank")}
            />
          ))}
        </div>
      )}

    </div>
  );
}