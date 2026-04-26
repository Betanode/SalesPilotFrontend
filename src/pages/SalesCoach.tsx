import { useState } from "react";

type Mode = "simulation" | "pitch" | "insights";

export default function SalesCoach() {
  const [mode, setMode] = useState<Mode>("simulation");
  const [files, setFiles] = useState<File[]>([]);
  const [processed, setProcessed] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
    setProcessed(false);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const processData = () => {
    if (files.length === 0) return;
    setProcessed(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-600 opacity-20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-purple-600 opacity-20 blur-[120px] rounded-full"></div>

      {/* 🔥 Sidebar (desktop only) */}
      <div className="w-64 border-r border-white/10 p-6 hidden lg:block relative z-10">
        <h2 className="text-lg font-semibold mb-6">
          Sales <span className="text-blue-400">Pilot</span>
        </h2>

        <div className="space-y-2">
          {[
            { key: "simulation", label: "Simulation Mode" },
            { key: "pitch", label: "Pitch Trainer" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setMode(item.key as Mode)}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm transition
                ${
                  mode === item.key
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-white/10"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 Main */}
      <div className="flex-1 p-6 md:p-10 relative z-10">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">
            {mode === "simulation" && "Simulation Mode"}
            {mode === "pitch" && "Pitch Trainer"}
          </h1>

          <p className="text-gray-400 mt-2">
            Upload your data once and use it across all coaching modes.
          </p>
        </div>

        {/* 🔥 Tabs for medium screens */}
        <div className="lg:hidden mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { key: "simulation", label: "Simulation" },
              { key: "pitch", label: "Pitch" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setMode(item.key as Mode)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition
                  ${
                    mode === item.key
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : "text-gray-400 border border-white/10 hover:text-white hover:bg-white/5"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 🔥 Upload Section */}
        <div className="mb-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_0_40px_rgba(59,130,246,0.1)]">

          <h2 className="text-lg font-semibold mb-2">
            Upload Your Sales Data
          </h2>

          <p className="text-gray-400 text-sm mb-4">
            Upload product PDFs or CRM exports to personalize coaching.
          </p>

          <div className="flex flex-col md:flex-row gap-4">

            <label className="flex-1 border border-dashed border-white/20 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 transition">
              <input
                type="file"
                accept=".pdf"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <p className="text-sm text-gray-300">
                Click or drag & drop PDFs
              </p>
            </label>

            <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4 max-h-40 overflow-y-auto">
              <p className="text-sm text-gray-400 mb-2">Uploaded Files</p>

              {files.length === 0 ? (
                <p className="text-xs text-gray-500">No files uploaded</p>
              ) : (
                files.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm mb-2"
                  >
                    <span className="truncate">{file.name}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-400 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            onClick={processData}
            className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-xl text-sm"
          >
            Process Data
          </button>

          {processed && (
            <p className="mt-3 text-green-400 text-sm">
              ✅ Data ready for coaching
            </p>
          )}
        </div>

        {/* 🔥 Main Content */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

          {/* Simulation */}
          {mode === "simulation" && (
            <div>
              <div className="h-[300px] bg-black/40 rounded-xl p-4 border border-white/10 mb-4">
                <p className="text-gray-500">AI Chat coming soon...</p>
              </div>

              <input
                placeholder="Type your response..."
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
          )}

          {/* Pitch */}
          {mode === "pitch" && (
            <div className="space-y-4">
              <textarea
                placeholder="Write your pitch..."
                className="w-full h-40 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400"
              />

              <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-xl text-sm">
                Analyze Pitch
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}