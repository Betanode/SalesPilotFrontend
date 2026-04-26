export default function Guide() {
  const steps = [
    {
      title: "Upload Your Data",
      desc: "Provide the data you want coaching on. Upload PDFs such as product documents, CRM exports, or any sales-related material to give context to the AI.",
    },
    {
      title: "AI Processing",
      desc: "Our AI processes your documents using advanced retrieval techniques to understand your business context and generate personalized sales coaching.",
    },
    {
      title: "Start Coaching",
      desc: "Begin coaching within seconds. In Role Play mode, the AI simulates real sales conversations. In Practice Pitch mode, refine your pitch with real-time feedback.",
    },
    {
      title: "Improve Continuously",
      desc: "Leverage insights and feedback to refine your sales strategy and close deals more effectively.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white px-6 py-20 overflow-hidden">

      {/* 🔥 MULTI COLOR BACKGROUND */}
      <div className="absolute top-[-200px] left-[10%] w-[500px] h-[500px] bg-blue-500 opacity-20 blur-[160px] rounded-full"></div>
      <div className="absolute bottom-[-200px] right-[10%] w-[500px] h-[500px] bg-purple-500 opacity-20 blur-[160px] rounded-full"></div>
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] bg-pink-500 opacity-10 blur-[140px] rounded-full"></div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Heading */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-semibold">
            How it{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              Works
            </span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            A simple but powerful workflow to transform your sales performance.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Gradient Line */}
          <div className="absolute left-1/2 top-0 w-[3px] h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-40 -translate-x-1/2"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative mb-20 flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              
              {/* Glowing Dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 shadow-[0_0_25px_rgba(139,92,246,0.8)]"></div>

              {/* Card */}
              <div className="w-full md:w-[45%] group relative">
                
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition"></div>

                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_0_40px_rgba(59,130,246,0.1)] hover:scale-[1.04] hover:shadow-[0_0_70px_rgba(139,92,246,0.25)] transition duration-300">
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-sm font-semibold">
                      {index + 1}
                    </div>
                    <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                      {step.title}
                    </h2>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="text-center mt-28">
          <p className="text-gray-400 mb-5 text-lg">
            Ready to experience it?
          </p>

          <a
            href="/sales-coach"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 px-10 py-4 rounded-xl text-sm font-medium shadow-lg shadow-purple-500/30 transition"
          >
            Start Coaching →
          </a>
        </div>

      </div>
    </div>
  );
}