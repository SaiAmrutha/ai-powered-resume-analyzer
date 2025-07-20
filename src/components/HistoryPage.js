import { useEffect, useState } from "react";
import { SuggestionsPDF } from "./SuggestionsPDF";

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest"); //latest or the oldest
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("resumeHistory");
    if (saved) {
      const parsed = JSON.parse(saved);
      const sorted = [...parsed].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      setHistory(sorted);
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("resumeHistory");
    setHistory([]);
  };

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    const filtered = history.filter((item) => !selectedIds.includes(item.id));
    setHistory(filtered);
    setSelectedIds([]);
    localStorage.setItem("resumeHistory", JSON.stringify(filtered));
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === history.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(history.map((item) => item.id));
    }
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "latest" ? "oldest" : "latest";
    const sorted = [...history].sort((a, b) => {
      return newOrder === "latest"
        ? new Date(b.timestamp) - new Date(a.timestamp)
        : new Date(a.timestamp) - new Date(b.timestamp);
    });
    setSortOrder(newOrder);
    setHistory(sorted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-green-600">
      <button
        onClick={() => (window.location.href = "/")}
        className="bg-gray-500 text-white text-3xl font-bold m-3  px-2 py-2 rounded-lg hover:bg-gray-800"
      >
        Main 🏢
      </button>

      <div className="p-10 max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 mt-[-8%] bg-gradient-to-br from-fuchsia-700 to-orange-600 bg-clip-text text-transparent">
          Resume History
        </h1>

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => (window.location.href = "/analyzer")}
            className="bg-gray-500 text-white text-3xl font-bold px-2 py-2 rounded-lg hover:bg-gray-800"
          >
            Home 🏠
          </button>

          <button
            onClick={clearHistory}
            className="bg-gray-500 text-white text-3xl font-bold px-2 py-2 rounded-lg hover:bg-gray-800"
          >
            Clear All 🧹
          </button>
        </div>

        <div className="mb-4 flex justify-end">
          <button
            onClick={toggleSortOrder}
            className=" bg-gray-700 text-2xl font-bold px-2 py-2 text-white underline"
          >
            Sort by: {sortOrder === "latest" ? "Latest First" : "Oldest First"}
          </button>
        </div>

        {history.length === 0 ? (
          <p className="text-4xl font-bold text-center text-gray-700">
            No resume history found.
          </p>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center space-x-2 text-lg">
                <input
                  type="checkbox"
                  checked={selectedIds.length === history.length}
                  onChange={toggleSelectAll}
                  className="h-6 w-10"
                />
                <span className="px-4 py-2 rounded bg-gray-600 text-white font-bold">
                  Select All
                </span>
              </label>

              <button
                onClick={deleteSelected}
                disabled={selectedIds.length === 0}
                className={`px-4 py-2 rounded ${
                  selectedIds.length === 0
                    ? "bg-gray-600 text-white font-bold cursor-not-allowed"
                    : "bg-red-400 hover:bg-red-800 text-white font-bold"
                }`}
              >
                Delete Selected
              </button>
            </div>

            <table className="w-full border-4-collapse">
              <thead>
                <tr className="bg-gray-600 text-white text-lg">
                  <th className="border-4 p-2">Select</th>
                  <th className="border-4 p-2">Resume Name</th>
                  <th className="border-4 p-2">Match Score</th>
                  <th className="border-4 p-2">Job Description</th>
                  <th className="border-4 p-2">Date</th>
                  <th className="border-4 p-2">Download</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} className="border-4">
                    <td className="text-center border-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => toggleSelection(item.id)}
                        className="h-6 w-10"
                      />
                    </td>

                    <td className="p-2 border-4-4 font-medium">
                      {item.resumeName}
                    </td>
                    <td className="p-2 border-4">{item.matchScore}</td>

                    <td className="border-4 px-2 max-w-xs">
                      <div className="relative group w-64">
                        <span className="block truncate text-ellipsis overflow-hidden whitespace-nowrap">
                          {item.jobDescription}
                        </span>

                        <div className="absolute hidden group-hover:block bg-blue-500 border-4 p-2 shadow-lg z-50 w-96 max-h-60 overflow-y-auto left-0 top-full">
                          <pre className="text-xs whitespace-pre-wrap">
                            {item.jobDescription}
                          </pre>
                        </div>
                      </div>
                    </td>

                    <td className="p-2 border-4">
                      {new Date(item.timestamp).toLocaleString()}
                    </td>
                    <td className="p-2 border-4">
                      <SuggestionsPDF
                        resumeText={item.resumeText}
                        suggestions={item.suggestions}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
