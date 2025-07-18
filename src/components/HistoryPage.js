import { useEffect, useState } from "react";
import { SuggestionsPDF } from "./SuggestionsPDF";

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest"); //latest or the oldest

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
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold text-center mb-4 underline text-blue-700">
        Resume History
      </h1>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => (window.location.href = "/")}
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
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-600 text-white text-lg">
              <th className="border p-2">Resume Name</th>
              <th className="border p-2">Match Score</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Download</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2 font-medium">{item.resumeName}</td>
                <td className="p-2">{item.matchScore}</td>
                <td className="p-2">
                  {new Date(item.timestamp).toLocaleString()}
                </td>
                <td className="p-2">
                  <SuggestionsPDF
                    resumeText={item.resumeText}
                    suggestions={item.suggestions}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HistoryPage;
