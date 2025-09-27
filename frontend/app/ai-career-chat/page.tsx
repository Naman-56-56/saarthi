"use client"
// Update the import path below if the file is located elsewhere, e.g.:
import { ChatInterface } from "./components-chat/chat-interface";
import { useEffect, useState } from "react";

interface Internship {
  title: string;
  department: string;
  location: string;
  duration: string;
  stipend: string;
  skills: string[];
  featured: boolean;
}

export default function Home() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [internshipLoading, setInternshipLoading] = useState(false);
  const [internshipError, setInternshipError] = useState<string | null>(null);

  useEffect(() => {
    setInternshipLoading(true);
    fetch("http://localhost:8000/api/internships?page=1&page_size=5")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch internships");
        return res.json();
      })
      .then((data) => {
        setInternships(data.internships || []);
        setInternshipError(null);
      })
      .catch((err) => {
        setInternshipError(err.message || "Unknown error");
      })
      .finally(() => setInternshipLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Internship List */}
      <div className="w-full max-w-2xl mb-6">
        <h2 className="text-xl font-bold mb-2 text-orange-700">
          Featured Internships
        </h2>
        {internshipLoading && (
          <div className="text-gray-600">Loading internships...</div>
        )}
        {internshipError && (
          <div className="text-red-600">{internshipError}</div>
        )}
        <ul className="space-y-3">
          {internships.map((intern, idx) => (
            <li
              key={idx}
              className="bg-white rounded-lg shadow p-4 border border-orange-100"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <div className="font-semibold text-orange-800">
                    {intern.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {intern.department} | {intern.location}
                  </div>
                  <div className="text-xs text-gray-500">
                    Duration: {intern.duration} | Stipend: {intern.stipend}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {intern.skills &&
                      intern.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-orange-100 text-orange-700 rounded px-2 py-0.5 text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                  </div>
                </div>
                {intern.featured && (
                  <span className="ml-2 px-2 py-1 bg-orange-200 text-orange-800 rounded text-xs font-bold">
                    Featured
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ChatInterface />
    </div>
  );
}
