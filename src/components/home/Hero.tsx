import { Link } from "react-router-dom";
import {
  Bold, Italic, Underline, Heading1, Heading2,
  List, ListOrdered, Code, AlignLeft, AlignCenter,
  ImageUp, Sparkles, Check, ArrowUp,
} from "lucide-react";

type HeroProps = {
  onExploreClick: () => void;
};

const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="w-full min-h-[90vh] flex items-center px-[50px] py-16 bg-gradient-to-b from-[#f5f6f8] to-[#e9eef2]">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[40px] items-center">

      {/* LEFT — Headline + CTAs */}
      <div className="max-w-[520px]">
        <h1 className="text-[48px] md:text-[56px] font-bold text-[#2e2257] leading-tight">
          Publish Your Voice <br /> Across Every Genre
        </h1>
        <p className="mt-4 text-[18px] text-gray-600">
          Write anything — from poetry to deep technical dives. Your drafts autosave
          the moment you step away, and an AI assistant is always a message away.
        </p>
        <div className="mt-6 flex gap-4">
          <Link
            to="/signup"
            className="px-6 py-3 bg-[#2e2257] text-white rounded-xl hover:opacity-90 transition"
          >
            Start Writing
          </Link>
          <button
            type="button"
            onClick={onExploreClick}
            className="px-6 py-3 border border-[#2e2257] text-[#2e2257] rounded-xl hover:bg-gray-100 transition"
          >
            Explore Blogs
          </button>
        </div>
      </div>

      {/* RIGHT — Editor mockup */}
      <div className="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:-translate-y-2 transition-transform duration-300">

        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <span className="text-sm font-semibold text-[#2e2257]">Inscribe</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[11px] text-green-700 bg-green-50 px-3 py-1 rounded-full">
              <Check size={11} /> Autosaved
            </span>
            <button className="text-xs font-semibold bg-[#2e2257] text-white px-4 py-1.5 rounded-full">
              Publish
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-0.5 px-3 py-2 border-b border-gray-100 bg-gray-50 flex-wrap">
          {[
            <Bold size={14} />, <Italic size={14} />, <Underline size={14} />,
          ].map((icon, i) => (
            <button key={i} className={`p-1.5 rounded-md ${i === 0 ? "bg-[#2e2257] text-white" : "text-gray-400 hover:bg-purple-50"}`}>
              {icon}
            </button>
          ))}
          <div className="w-px h-4 bg-gray-200 mx-1" />
          {[<Heading1 size={14} />, <Heading2 size={14} />].map((icon, i) => (
            <button key={i} className="p-1.5 rounded-md text-gray-400 hover:bg-purple-50">{icon}</button>
          ))}
          <div className="w-px h-4 bg-gray-200 mx-1" />
          {[<List size={14} />, <ListOrdered size={14} />, <Code size={14} />].map((icon, i) => (
            <button key={i} className="p-1.5 rounded-md text-gray-400 hover:bg-purple-50">{icon}</button>
          ))}
          <div className="w-px h-4 bg-gray-200 mx-1" />
          {[<AlignLeft size={14} />, <AlignCenter size={14} />, <ImageUp size={14} />].map((icon, i) => (
            <button key={i} className="p-1.5 rounded-md text-gray-400 hover:bg-purple-50">{icon}</button>
          ))}
        </div>

        {/* Body: editor + AI panel */}
        <div className="flex min-h-[280px]">

          {/* Editor area */}
          <div className="flex-1 p-5 border-r border-gray-100">
            <div className="text-lg font-semibold text-[#2e2257] mb-3">
              The quiet art of slow travel
            </div>
            <div className="space-y-2">
              {[100, 88, 94, 72].map((w, i) => (
                <div key={i} className="h-2.5 bg-gray-100 rounded" style={{ width: `${w}%` }} />
              ))}
              <p className="text-[11px] font-semibold text-gray-400 pt-1">Why rushing misses the point</p>
              {[100, 90].map((w, i) => (
                <div key={i} className="h-2.5 bg-gray-100 rounded" style={{ width: `${w}%` }} />
              ))}
              <div className="flex items-center gap-1" style={{ width: "60%" }}>
                <div className="h-2.5 bg-gray-100 rounded flex-1" />
                <div className="w-0.5 h-3.5 bg-[#2e2257] rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* AI chat widget */}
          <div className="w-[220px] flex flex-col">
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100">
              <Sparkles size={14} className="text-[#534AB7]" />
              <span className="text-[12px] font-semibold text-[#2e2257]">AI assistant</span>
              <span className="ml-auto text-[10px] bg-[#EEEDFE] text-[#3C3489] px-2 py-0.5 rounded-full">Beta</span>
            </div>

            <div className="flex-1 p-3 flex flex-col gap-2">
              <div className="text-[11px] bg-[#EEEDFE] text-[#3C3489] rounded-xl rounded-bl-sm px-3 py-2 leading-relaxed self-start max-w-[90%]">
                Hi! Tell me your topic and I'll help write or improve your blog.
              </div>
              <div className="text-[11px] bg-[#2e2257] text-[#CECBF6] rounded-xl rounded-br-sm px-3 py-2 leading-relaxed self-end max-w-[90%]">
                Write an intro about slow travel
              </div>
              <div className="text-[11px] bg-[#EEEDFE] text-[#3C3489] rounded-xl rounded-bl-sm px-3 py-2 leading-relaxed self-start max-w-[90%]">
                Here's a draft — paste it and edit freely.
              </div>
              <div className="text-[11px] bg-[#EEEDFE] text-[#3C3489] rounded-xl rounded-bl-sm px-3 py-2 leading-relaxed italic self-start max-w-[90%]">
                In a world obsessed with itineraries, slow travel is a quiet rebellion...
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 border-t border-gray-100">
              <div className="flex-1 h-7 bg-gray-50 border border-gray-100 rounded-md text-[11px] text-gray-300 px-2 flex items-center">
                Ask anything...
              </div>
              <div className="w-6 h-6 bg-[#2e2257] rounded-md flex items-center justify-center flex-shrink-0">
                <ArrowUp size={12} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
    </section>
  );
};

export default Hero;