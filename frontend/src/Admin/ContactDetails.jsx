import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StudentsTable() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/students`);
      setStudents(res.data?.data || []);
    } catch (err) {
      console.error("Fetch students error:", err);
      setError(err?.response?.data?.message || "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Students</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchStudents}
            className="px-3 py-1.5 bg-gray-100 rounded-md text-sm hover:bg-gray-200 transition"
            aria-label="Refresh students"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">Loading students...</div>
        ) : error ? (
          <div className="p-4 text-red-600">{error}</div>
        ) : students.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No students found.</div>
        ) : (
          <>
            {/* Desktop / Tablet: table (md+) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Education</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Message</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Created At</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-100">
                  {students.map((s) => (
                    <tr key={s._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{s.name}</div>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-700">{s.num}</div>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-700 truncate max-w-xs">{s.email}</div>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-700">{s.education || "-"}</div>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-700">{s.location || "-"}</div>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-700 max-w-xs truncate">{s.interest || "-"}</div>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {s.createdAt ? new Date(s.createdAt).toLocaleString() : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: stacked cards (sm) */}
            <div className="md:hidden divide-y divide-gray-100">
              {students.map((s) => (
                <div key={s._id} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">{s.name}</h3>
                        <div className="text-xs text-gray-500">{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : "-"}</div>
                      </div>

                      <div className="mt-2 text-sm text-gray-700 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-600 w-20">Phone:</span>
                          <span className="truncate">{s.num || "-"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-600 w-20">Email:</span>
                          <span className="truncate">{s.email || "-"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-600 w-20">Education:</span>
                          <span className="truncate">{s.education || "-"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-600 w-20">Location:</span>
                          <span className="truncate">{s.location || "-"}</span>
                        </div>

                        <div className="flex items-start gap-2">
                          <span className="font-medium text-gray-600 w-20">Message:</span>
                          <span className="truncate">{s.interest || "-"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
