import { Link } from "react-router-dom";
import {
  PenLine, Sparkles,
  Check, ArrowUp, Bold, Italic, Underline,
  Heading1, List, Code, ImageUp, Save,
} from "lucide-react";

const CTASection: React.FC = () => {
  return (
    <section className="w-full px-[50px] py-16 bg-[#f5f6f8]">
      <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-lg">

        {/* LEFT — features */}
        <div className="bg-[#2e2257] text-white p-10 md:p-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Craft Your Digital Literacy
          </h2>
          <p className="text-gray-200 mb-8 leading-relaxed">
            Join thousands of writers who share their expertise, creativity, and
            perspectives. Whether you're documenting technical insights or
            expressing artistic visions, our platform empowers you to reach your
            audience.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-lg shrink-0">
                <PenLine size={20} />
              </div>
              <div>
                <h4 className="font-semibold">Intuitive rich text editor</h4>
                <p className="text-sm text-gray-300">
                  Bold, headings, lists, code blocks, and inline images — all in a
                  distraction-free interface.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-lg shrink-0">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="font-semibold">AI writing assistant</h4>
                <p className="text-sm text-gray-300">
                  Chat to generate intros, beat writer's block, or rephrase any
                  section in seconds.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-lg shrink-0">
                <Save size={20} />
              </div>
              <div>
                <h4 className="font-semibold">Autosave — always</h4>
                <p className="text-sm text-gray-300">
                  Switch tabs, lose Wi-Fi, or log out unexpectedly. Your draft is
                  safe and waiting when you return.
                </p>
              </div>
            </div>
 
          </div>
        </div>

        {/* RIGHT — live preview mockup */}
        <div className="bg-[#4b3a78] flex flex-col items-center justify-center p-8 md:p-10 gap-6">

          {/* Mini editor mockup */}
          <div className="w-full max-w-[380px] bg-white rounded-2xl overflow-hidden">

            {/* Editor topbar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
              <span className="text-xs font-semibold text-[#2e2257]">My draft</span>
              <span className="flex items-center gap-1 text-[10px] text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full">
                <Check size={9} /> Autosaved
              </span>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-0.5 px-2.5 py-1.5 border-b border-gray-100 bg-gray-50">
              {[
                { icon: <Bold size={12} />, active: true },
                { icon: <Italic size={12} /> },
                { icon: <Underline size={12} /> },
                { icon: <Heading1 size={12} /> },
                { icon: <List size={12} /> },
                { icon: <Code size={12} /> },
                { icon: <ImageUp size={12} /> },
              ].map((btn, i) => (
                <button
                  key={i}
                  className={`p-1.5 rounded-md ${btn.active ? "bg-[#2e2257] text-white" : "text-gray-400 hover:bg-purple-50"}`}
                >
                  {btn.icon}
                </button>
              ))}
            </div>

            {/* Editor body + AI panel */}
            <div className="flex" style={{ minHeight: 180 }}>

              {/* Editor content */}
              <div className="flex-1 p-4 border-r border-gray-100">
                <div className="h-3 w-[60%] bg-[#2e2257]/20 rounded mb-3" />
                <div className="space-y-1.5">
                  {[100, 85, 92, 68].map((w, i) => (
                    <div key={i} className="h-2 bg-gray-100 rounded" style={{ width: `${w}%` }} />
                  ))}
                  <div className="flex items-center gap-1" style={{ width: "55%" }}>
                    <div className="h-2 bg-gray-100 rounded flex-1" />
                    <div className="w-0.5 h-3 bg-[#2e2257] rounded animate-pulse" />
                  </div>
                </div>
              </div>

              {/* AI chat panel */}
              <div className="w-[130px] flex flex-col">
                <div className="flex items-center gap-1.5 px-2.5 py-2 border-b border-gray-100">
                  <Sparkles size={11} className="text-[#534AB7]" />
                  <span className="text-[10px] font-semibold text-[#2e2257]">AI assistant</span>
                </div>
                <div className="flex-1 p-2 flex flex-col gap-1.5">
                  <div className="text-[9px] bg-[#EEEDFE] text-[#3C3489] rounded-lg rounded-bl-none px-2 py-1.5 leading-relaxed self-start">
                    What topic are you writing about?
                  </div>
                  <div className="text-[9px] bg-[#2e2257] text-[#CECBF6] rounded-lg rounded-br-none px-2 py-1.5 leading-relaxed self-end">
                    Slow travel tips
                  </div>
                  <div className="text-[9px] bg-[#EEEDFE] text-[#3C3489] rounded-lg rounded-bl-none px-2 py-1.5 leading-relaxed italic self-start">
                    Here's a compelling intro for you...
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1.5 border-t border-gray-100">
                  <div className="flex-1 h-5 bg-gray-50 border border-gray-100 rounded text-[9px] text-gray-300 px-1.5 flex items-center">
                    Ask...
                  </div>
                  <div className="w-5 h-5 bg-[#2e2257] rounded flex items-center justify-center shrink-0">
                    <ArrowUp size={9} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-white mb-2">Ready to start?</h3>
            <p className="text-gray-300 text-sm mb-5">
              Create your account and publish your first post in minutes.
            </p>
            <Link
              to="/signup"
              className="px-8 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-400 transition inline-block"
            >
              Sign Up Free
            </Link>
            <p className="text-xs text-gray-400 mt-3">No credit card required</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CTASection;