import { useEffect, useState } from "react";
import { getHomeBlogs } from "../../utils/api/adminApi/blogs.api"; 
import type { BlogItem } from "../../utils/api/adminApi/blogs.api";

const stripHTML = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const TrendingSection: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getHomeBlogs();
        // optional: filter only published
        const published = data.filter((b) => b.isPublished !== false);
        setBlogs(published);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading || blogs.length === 0) return null;

  // duplicate for infinite scroll
  const loopBlogs = [...blogs, ...blogs];

  return (
    <section  id="trending" className="w-full py-16 bg-[#f5f6f8] overflow-hidden scroll-mt-[80px]">
      
      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#2e2257]">
          Trending Stories
        </h2>
        <p className="text-gray-500 mt-2">
          Discover what our community is reading
        </p>
      </div>

      {/* CAROUSEL WRAPPER */}
      <div className="relative">
        
        {/* LEFT FADE */}
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#f5f6f8] to-transparent z-10" />
        
        {/* RIGHT FADE */}
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#f5f6f8] to-transparent z-10" />

        {/* CAROUSEL */}
        <div className="flex gap-6 animate-scroll hover:[animation-play-state:paused]">
          
          {loopBlogs.map((blog, index) => (
            <a
                key={`${blog.id}-${index}`}
                href={`/blog/${blog.id}`}   
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[300px] max-w-[300px] bg-white rounded-2xl shadow-md overflow-hidden block hover:shadow-lg transition"
            >
                
                {/* IMAGE */}
                <img
                src={blog.image || "/fallback.jpg"}
                alt={blog.title}
                className="w-full h-[180px] object-cover"
                />

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="font-semibold text-[16px] leading-snug line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {stripHTML(blog.description)}
                  </p>
                </div>

            </a>
            ))}

        </div>
      </div>
    </section>
  );
};

export default TrendingSection;