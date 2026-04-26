export default function Home() {
  return (
    <div className="relative bg-black text-white overflow-hidden">

      {/* 🔥 MULTI-LAYER BACKGROUND */}
      <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-blue-500 opacity-20 blur-[160px] rounded-full"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-purple-500 opacity-20 blur-[160px] rounded-full"></div>
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] bg-pink-500 opacity-10 blur-[140px] rounded-full"></div>
      <div className="absolute top-[10%] right-[20%] w-[300px] h-[300px] bg-cyan-400 opacity-10 blur-[120px] rounded-full"></div>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative z-10">
        
        <h1 className="text-5xl md:text-7xl font-semibold leading-tight">
           <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            SalesPilot
          </span>
        </h1>
        <h4 className="text-4xl md:text-4xl font-semibold leading-tight p-2">
            Your Personal AI Sales Coach
        </h4>

        <p className="text-gray-300 mt-6 max-w-2xl text-lg">
          Stop guessing. Start improving. Practice real sales conversations,
          refine your pitch, and close deals faster with AI-powered coaching.
        </p>

        <div className="mt-10 flex gap-4">
          <a
            href="/sales-coach"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 px-8 py-3 rounded-xl text-sm font-medium shadow-lg shadow-purple-500/30 transition"
          >
            Start Practicing
          </a>

          <a
            href="/guide"
            className="border border-white/20 hover:bg-white/10 px-8 py-3 rounded-xl text-sm font-medium backdrop-blur-md transition"
          >
            See How It Works
          </a>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="px-6 py-24 max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-4xl font-semibold mb-6">
          Sales is hard. Practicing is harder.
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Most sales reps don’t get real practice. No feedback. No safe space
          to fail. That’s why growth is slow.
        </p>
      </section>

      {/* SOLUTION */}
      <section className="px-6 py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center relative">
          
          {/* glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 via-purple-300/10 to-pink-300/10 blur-3xl rounded-3xl"></div>

          <div className="relative bg-white/5 border border-white/10 rounded-3xl p-10">
            
            <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              Train like a top sales performer
            </h2>

            <p className="text-gray-300 text-lg">
              AI Sales Coach simulates real conversations, analyzes your responses,
              and gives actionable feedback so you improve every single time.
            </p>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-24 max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl font-semibold text-center mb-14">
          What You Can Do
        </h2>

        <div className="grid md:grid-cols-3 gap-8 ">
          
          {[
            {
              title: "Role Play Sales Calls",
              desc: "Practice real-world scenarios with AI acting as your customer.",
            },
            {
              title: "Improve Your Pitch",
              desc: "Get instant feedback to refine and strengthen your pitch.",
            },
            {
              title: "Learn From Your Data",
              desc: "Upload PDFs and get personalized coaching insights.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative"
            >
              
              {/* glow layer */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition"></div>

              <div className="relative bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] hover:scale-[1.05] hover:shadow-[0_0_70px_rgba(139,92,246,0.25)] transition duration-300">
                
                <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                  {item.title}
                </h3>

                <p className="text-gray-400 mt-2 text-sm">
                  {item.desc}
                </p>
              </div>

            </div>
          ))}

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-28 text-center relative z-10">
        <h2 className="text-4xl font-semibold">
          Ready to become a better closer?
        </h2>

        <p className="text-gray-400 mt-4 text-lg">
          Start practicing today and see the difference.
        </p>

        <a
          href="/sales-coach"
          className="inline-block mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 px-10 py-4 rounded-xl text-sm font-medium shadow-lg shadow-purple-500/30 transition"
        >
          Try AI Sales Coach →
        </a>
      </section>
    </div>
  );
}