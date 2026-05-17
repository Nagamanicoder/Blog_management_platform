import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ContentCardProps {
  id: string;
  image: string;
  title: string;
  username?: string;
  onDeleteConfirm: (id: string) => void;
  showEdit?: boolean;
  showDelete?: boolean;
  onClick?: () => void;
}

export default function ContentCard({
  id,
  image,
  title,
  username,
  onDeleteConfirm,
  showEdit = true,
  showDelete = true,
  onClick,
}: ContentCardProps) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const confirmDelete = () => {
    onDeleteConfirm(id);
    setShowModal(false);
  };

  return (
    <>
      <div
        onClick={onClick}
        className="rounded-2xl overflow-hidden bg-white text-[#1F0954] transition-all duration-300 w-80 cursor-pointer"
        style={{ boxShadow: "0 4px 24px 0 rgba(31, 9, 84, 0.15)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow = "0 8px 36px 0 rgba(31, 9, 84, 0.35)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.boxShadow = "0 4px 24px 0 rgba(31, 9, 84, 0.15)")
        }
      >
        {/* Image */}
        <div className="h-52 w-full overflow-hidden bg-gray-50">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-200 text-sm">
              No image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-2">
          <h2 className="text-lg font-bold text-[#1F0954] leading-snug">{title}</h2>
          {username && (
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <span className="w-5 h-5 rounded-full bg-[#1F0954] text-white flex items-center justify-center text-[10px] font-bold">
                {username[0].toUpperCase()}
              </span>
              {username}
            </p>
          )}

          {(showEdit || showDelete) && (
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-1">
              {/* Edit */}
              {showEdit ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent card click
                    navigate(`/admin/writer/${id}`);
                  }}
                  className="flex items-center gap-1 text-sm font-medium text-[#1F0954] hover:opacity-70 transition"
                >
                  Edit
                </button>
              ) : (
                <span />
              )}

              {/* Delete */}
              {showDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent card click
                    setShowModal(true);
                  }}
                  className="text-gray-300 hover:text-red-500 transition"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            className="bg-white text-[#1F0954] p-6 rounded-2xl w-[340px]"
            style={{ boxShadow: "0 8px 36px 0 rgba(31, 9, 84, 0.3)" }}
          >
            <h3 className="text-lg font-bold mb-2">Delete this draft?</h3>
            <p className="text-sm text-gray-400 mb-6">
              This piece will vanish into the void. Are you certain you want to erase it?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1.5 text-sm text-gray-400 hover:text-[#1F0954] transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}