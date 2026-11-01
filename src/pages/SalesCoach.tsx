import { useState } from "react";
import {
  uploadDocument,
  startSession,
  sendMessage,
  askLLM,
} from "../lib/api";

type Mode = "simulation" | "pitch";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

export default function SalesCoach() {
  const [mode, setMode] = useState<Mode>("simulation");
  const [files, setFiles] = useState<File[]>([]);
  const [processed, setProcessed] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Simulation chat state
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  // Pitch trainer state
  const [pitchText, setPitchText] = useState("");
  const [pitchFeedback, setPitchFeedback] = useState<string | null>(null);
  const [pitchLoading, setPitchLoading] = useState(false);
  const [pitchError, setPitchError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
    setProcessed(false);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setProcessed(false);
  };

  const processData = async () => {
    if (files.length === 0) return;
    setUploading(true);
    setUploadError(null);
    try {
      for (const file of files) {
        await uploadDocument(file);
      }
      setProcessed(true);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const beginSimulation = async () => {
    setChatError(null);
    setChatLoading(true);
    try {
      const res = await startSession();
      setSessionId(res.session_id);
      setChat([{ role: "assistant", content: res.message }]);
      setSessionDone(false);
    } catch (err) {
      setChatError(err instanceof Error ? err.message : "Failed to start session.");
    } finally {
      setChatLoading(false);
    }
  };

  const handleSend = async () => {
    const text = chatInput.trim();
    if (!text || !sessionId || sessionDone) return;

    setChat((prev) => [...prev, { role: "user", content: text }]);
    setChatInput("");
    setChatLoading(true);
    setChatError(null);

    try {
      const res = await sendMessage(sessionId, text);
      setChat((prev) => [...prev, { role: "assistant", content: res.message }]);
      if (res.is_final) setSessionDone(true);
    } catch (err) {
      setChatError(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setChatLoading(false);
    }
  };

  const analyzePitch = async () => {
    const text = pitchText.trim();
    if (!text) return;

    setPitchLoading(true);
    setPitchError(null);
    setPitchFeedback(null);

    try {
      const prompt = `You are an expert sales coach. Review the following sales pitch and give specific, actionable feedback on its strengths and weaknesses, plus a score out of 10:\n\n${text}`;
      const res = await askLLM(prompt);
      setPitchFeedback(res.response);
    } catch (err) {
      setPitchError(err instanceof Error ? err.message : "Failed to analyze pitch.");
    } finally {
      setPitchLoading(false);
    }
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
            disabled={files.length === 0 || uploading}
            className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-xl text-sm disabled:opacity-50"
          >
            {uploading ? "Processing..." : "Process Data"}
          </button>

          {processed && (
            <p className="mt-3 text-green-400 text-sm">
              ✅ Data ready for coaching
            </p>
          )}

          {uploadError && (
            <p className="mt-3 text-red-400 text-sm">{uploadError}</p>
          )}
        </div>

        {/* 🔥 Main Content */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

          {/* Simulation */}
          {mode === "simulation" && (
            <div>
              <div className="h-[300px] bg-black/40 rounded-xl p-4 border border-white/10 mb-4 overflow-y-auto flex flex-col gap-3">
                {chat.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-3">
                    <p className="text-gray-500 text-sm">
                      Start a practice session with your AI sales coach.
                    </p>
                    <button
                      onClick={beginSimulation}
                      disabled={chatLoading}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-xl text-sm disabled:opacity-50"
                    >
                      {chatLoading ? "Starting..." : "Start Session"}
                    </button>
                  </div>
                ) : (
                  chat.map((m, i) => (
                    <div
                      key={i}
                      className={`max-w-[80%] px-4 py-2 rounded-xl text-sm whitespace-pre-wrap ${
                        m.role === "assistant"
                          ? "bg-white/10 self-start"
                          : "bg-blue-600/60 self-end"
                      }`}
                    >
                      {m.content}
                    </div>
                  ))
                )}
              </div>

              {chatError && (
                <p className="mb-2 text-red-400 text-sm">{chatError}</p>
              )}

              {sessionDone && (
                <div className="mb-3 flex justify-center">
                  <button
                    onClick={beginSimulation}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-xl text-sm"
                  >
                    Start New Session
                  </button>
                </div>
              )}

              <div className="flex gap-2">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  disabled={!sessionId || sessionDone || chatLoading}
                  placeholder="Type your response..."
                  className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!sessionId || sessionDone || chatLoading || !chatInput.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-xl text-sm disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          )}

          {/* Pitch */}
          {mode === "pitch" && (
            <div className="space-y-4">
              <textarea
                value={pitchText}
                onChange={(e) => setPitchText(e.target.value)}
                placeholder="Write your pitch..."
                className="w-full h-40 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400"
              />

              <button
                onClick={analyzePitch}
                disabled={!pitchText.trim() || pitchLoading}
                className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-xl text-sm disabled:opacity-50"
              >
                {pitchLoading ? "Analyzing..." : "Analyze Pitch"}
              </button>

              {pitchError && <p className="text-red-400 text-sm">{pitchError}</p>}

              {pitchFeedback && (
                <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-sm whitespace-pre-wrap">
                  {pitchFeedback}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
