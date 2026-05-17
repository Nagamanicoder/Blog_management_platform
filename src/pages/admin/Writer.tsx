import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, common } from "lowlight";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2,
  List, ListOrdered, Code, AlignLeft, AlignCenter, AlignRight, Upload,
} from "lucide-react";
import { createBlog, updateBlog, publishBlog, getDraftById } from "../../utils/api/adminApi/blogs.api";

const lowlight = createLowlight(common);

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function WriterPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [blogId, setBlogId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [loadingDraft, setLoadingDraft] = useState(!!id);

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blogIdRef = useRef<string | null>(null);
  const coverFileRef = useRef<File | null>(null);
  // ✅ Holds fetched content until editor is ready
  const pendingContent = useRef<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,  
      }),
      Image,
      Underline,
      Placeholder.configure({ placeholder: "Tell your story..." }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: "<p></p>",
    editorProps: {
      attributes: {
        class: "outline-none min-h-[400px] text-gray-800 text-lg leading-relaxed",
      },
    },
    // ✅ Apply pending content as soon as editor mounts
    onCreate({ editor }) {
      if (pendingContent.current) {
        editor.commands.setContent(pendingContent.current);
        pendingContent.current = null;
      }
    },
  });

  // keep refs in sync
  useEffect(() => {
    blogIdRef.current = blogId;
  }, [blogId]);

  useEffect(() => {
    coverFileRef.current = coverFile;
  }, [coverFile]);

  // ✅ Load existing draft when :id is present
  // Fetch is independent of editor being ready — timing handled via pendingContent ref + onCreate
  useEffect(() => {
    if (!id) return;

    const loadDraft = async () => {
      try {
        setLoadingDraft(true);
        const draft = await getDraftById(id);
        setBlogId(draft.id);
        blogIdRef.current = draft.id;
        setTitle(draft.title ?? "");
        if (draft.image) setCoverImage(draft.image);

        const content = draft.description ?? "<p></p>";

        if (editor) {
          // Editor already ready — set content directly
          editor.commands.setContent(content);
        } else {
          // Editor not ready yet — store for onCreate to pick up
          pendingContent.current = content;
        }
      } catch (err) {
        console.error("Failed to load draft", err);
      } finally {
        setLoadingDraft(false);
      }
    };

    loadDraft();
  }, [id]); // ✅ editor intentionally excluded — handled via ref + onCreate

  // --- AUTOSAVE ---
  const triggerAutosave = () => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => doSave(), 3000);
  };

  const doSave = async () => {
    if (!editor) return;
    const content = editor.getHTML();
    if (!title.trim() && !content.trim()) return;

    const pendingCoverFile = coverFileRef.current;

    try {
      setSaveStatus("saving");
      const currentId = blogIdRef.current;

      if (!currentId) {
        const blog = await createBlog({
          title: title || "Untitled",
          content,
          ...(pendingCoverFile ? { uploaded_image: pendingCoverFile } : {}),
        });
        setBlogId(blog.id);
        blogIdRef.current = blog.id;
      } else {
        await updateBlog(currentId, {
          title: title || "Untitled",
          content,
          ...(pendingCoverFile ? { uploaded_image: pendingCoverFile } : {}),
        });
      }

      setLastSaved(new Date());
      setSaveStatus("saved");

      if (pendingCoverFile) {
        setCoverFile(null);
        coverFileRef.current = null;
      }
    } catch {
      setSaveStatus("error");
    }
  };

  // Trigger autosave on title change
  useEffect(() => {
    if (title) triggerAutosave();
  }, [title]);

  // Trigger autosave on editor content change
  useEffect(() => {
    if (!editor) return;
    const handler = () => triggerAutosave();
    editor.on("update", handler);
    return () => editor.off("update", handler);
  }, [editor]);

  // --- COVER IMAGE ---
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    coverFileRef.current = file;
    setCoverImage(URL.createObjectURL(file));
    triggerAutosave();
  };

  // --- INLINE IMAGE ---
  const handleInlineImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    const url = URL.createObjectURL(file);
    editor.chain().focus().setImage({ src: url }).run();
  };

  // --- PUBLISH ---
  const handlePublish = async () => {
    try {
      setPublishing(true);
      await doSave();
      const currentId = blogIdRef.current;
      if (!currentId) return;
      await publishBlog(currentId);
      setShowPublishModal(false);
      navigate("/admin/published");
    } catch {
      // handle error
    } finally {
      setPublishing(false);
    }
  };

  if (loadingDraft) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-400 text-sm animate-pulse">
        Loading draft...
      </div>
    );
  }

  if (!editor) return null;

  const toolbarBtn = (onClick: () => void, label: React.ReactNode, active = false) => (
    <button
      onClick={onClick}
      title={typeof label === "string" ? label : undefined}
      className={`p-2 rounded-lg transition ${
        active
          ? "bg-[#1F0954] text-white"
          : "text-gray-500 hover:bg-purple-50 hover:text-[#1F0954]"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-white text-[#1F0954]">

      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#1F0954]">Inscribe - Craft your digital literacy</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            {saveStatus === "saving" && (
              <span className="text-yellow-500 animate-pulse">Saving...</span>
            )}
            {saveStatus === "saved" && lastSaved && (
              <span className="text-green-500">
                Saved {/* Saved at {lastSaved.toLocaleTimeString()} */}
              </span>
            )}
            {saveStatus === "error" && (
              <span className="text-red-400">Save failed</span>
            )}
            {saveStatus === "idle" && (
              <span className="text-gray-300">Saving...</span>
            )}
          </span>

          <button
            onClick={() => setShowPublishModal(true)}
            className="px-5 py-1.5 bg-[#1F0954] text-white text-sm font-semibold rounded-full hover:opacity-90 transition"
          >
            Publish
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Cover Image */}
        {coverImage ? (
          <div className="relative mb-8 rounded-xl overflow-hidden h-64 group">
            <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
            <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition cursor-pointer text-white text-sm font-medium gap-2">
              <Upload size={16} /> Change Cover
              <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
            </label>
          </div>
        ) : (
          <label className="flex items-center gap-2 text-gray-300 hover:text-[#1F0954] text-sm cursor-pointer mb-6 w-fit transition">
            <Upload size={16} />
            Upload cover image
            <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
          </label>
        )}

        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Article title..."
          className="w-full text-4xl font-bold text-[#1F0954] placeholder-gray-200 outline-none mb-6 border-none bg-transparent"
        />

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 mb-6 p-2 border border-gray-100 rounded-xl bg-gray-50 sticky top-16 z-10">
          {toolbarBtn(() => editor.chain().focus().toggleBold().run(), <Bold size={16} />, editor.isActive("bold"))}
          {toolbarBtn(() => editor.chain().focus().toggleItalic().run(), <Italic size={16} />, editor.isActive("italic"))}
          {toolbarBtn(() => editor.chain().focus().toggleUnderline().run(), <UnderlineIcon size={16} />, editor.isActive("underline"))}

          <div className="w-px h-5 bg-gray-200 mx-1" />

          {toolbarBtn(() => editor.chain().focus().toggleHeading({ level: 1 }).run(), <Heading1 size={16} />, editor.isActive("heading", { level: 1 }))}
          {toolbarBtn(() => editor.chain().focus().toggleHeading({ level: 2 }).run(), <Heading2 size={16} />, editor.isActive("heading", { level: 2 }))}

          <div className="w-px h-5 bg-gray-200 mx-1" />

          {toolbarBtn(() => editor.chain().focus().toggleBulletList().run(), <List size={16} />, editor.isActive("bulletList"))}
          {toolbarBtn(() => editor.chain().focus().toggleOrderedList().run(), <ListOrdered size={16} />, editor.isActive("orderedList"))}
          {toolbarBtn(() => editor.chain().focus().toggleCodeBlock().run(), <Code size={16} />, editor.isActive("codeBlock"))}

          <div className="w-px h-5 bg-gray-200 mx-1" />

          {toolbarBtn(() => editor.chain().focus().setTextAlign("left").run(), <AlignLeft size={16} />, editor.isActive({ textAlign: "left" }))}
          {toolbarBtn(() => editor.chain().focus().setTextAlign("center").run(), <AlignCenter size={16} />, editor.isActive({ textAlign: "center" }))}
          {toolbarBtn(() => editor.chain().focus().setTextAlign("right").run(), <AlignRight size={16} />, editor.isActive({ textAlign: "right" }))}
        </div>

        {/* Editor Content */}
        <div className="prose prose-lg max-w-none">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* Publish Confirmation Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-2xl p-6 w-[360px]"
            style={{ boxShadow: "0 8px 36px 0 rgba(31, 9, 84, 0.25)" }}
          >
            <h3 className="text-xl font-bold text-[#1F0954] mb-2">Ready to publish?</h3>
            <p className="text-sm text-gray-400 mb-6">
              Your blog will be visible to everyone. Make sure it's ready!
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPublishModal(false)}
                className="px-4 py-1.5 text-sm text-gray-400 hover:text-[#1F0954] transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="px-5 py-1.5 text-sm bg-[#1F0954] text-white rounded-full hover:opacity-90 transition disabled:opacity-50"
              >
                {publishing ? "Publishing..." : "Publish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}