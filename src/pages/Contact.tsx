import { useState } from "react";

type ContactType = {
  name: string;
  email?: string;
  phone?: string;
};

const contacts: ContactType[] = [
  {
    name: "Abhinav Dwivedi",
    email: "abhinavdwivedi1001@gmail.com",
    phone: "+91 9935022926",
  },
  {
    name: "Pranshu Srivastava",
    email: "pranshusrivastava000@gmail.com",
    phone: "+91 9580281173",
  },
];

export default function Contact() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-16 bg-black text-white overflow-hidden">
      
      {/* 🔥 Background Glow */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-blue-600 opacity-20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-purple-600 opacity-20 blur-[140px] rounded-full"></div>

      <div className="w-full max-w-5xl relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-semibold tracking-tight">
            Get in <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Touch</span>
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            Let’s collaborate and build something impactful 🚀
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          {contacts.map((person, index) => (
            <div
              key={index}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-r from-blue-500/40 to-purple-500/40 hover:from-blue-500 hover:to-purple-500 transition"
            >
              
              {/* Inner Card */}
              <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-8 h-full transform transition duration-300 group-hover:scale-[1.03] group-hover:rotate-[0.5deg]">
                
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xl font-semibold shadow-lg">
                    {person.name[0]}
                  </div>
                </div>

                <div className="space-y-5 text-center">
                  
                  {/* Name */}
                  <div>
                    <p className="text-lg font-semibold">{person.name}</p>
                  </div>

                  {/* Email */}
                  {person.email && (
                    <div>
                      <a
                        href={`mailto:${person.email}`}
                        className="text-blue-400 hover:underline text-sm"
                      >
                        {person.email}
                      </a>
                    </div>
                  )}

                  {/* Phone */}
                  {person.phone && (
                    <div>
                      <a
                        href={`tel:${person.phone}`}
                        className="text-gray-400 text-sm"
                      >
                        {person.phone}
                      </a>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-8 text-center">
                  {person.email ? (
                    <a
                      href={`mailto:${person.email}`}
                      className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 px-6 py-3 rounded-xl text-sm font-medium shadow-lg"
                    >
                      Connect with {person.name.split(" ")[0]}
                    </a>
                  ) : (
                    <button className="bg-blue-600 px-6 py-3 rounded-xl text-sm font-medium">
                      Contact {person.name.split(" ")[0]}
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}