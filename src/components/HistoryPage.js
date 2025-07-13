import { useEffect, useState } from "react";
import { SuggestionsPDF } from "./SuggestionsPDF";

function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("resumeHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("resumeHistory");
    setHistory([]);
  };

  return (
    <div className="p-10  text-center max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-5xl font-bold">Resume History</h1>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="bg-red-500 text-white font-bold px-4 py-2 rounded-md hover:bg-red-800"
          >
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-center text-lg pt-3 text-gray-600">
          No resume history found.
        </p>
      ) : (
        history.map((item) => (
          <div
            key={item.id}
            className="border-4 mt-5 border-blue-600 bg-white p-4 rounded-lg mb-4"
          >
            <p className="text-lg font-bold">{item.resumeName}</p>

            <p className="text-sm text-gray-600 mb-2">
              {new Date(item.timestamp).toLocaleString()}
            </p>

            <p className="text-sm mb-2 text-gray-600">
              <span className="font-semibold">JD Preview:</span>{" "}
              {item.jobDescription.slice(0, 80)}...
            </p>

            <p className="text-lg mb-2">
              <span className="font-semibold">Match Score:</span>{" "}
              {item.matchScore}%
            </p>

            <div className="mt-3">
              <SuggestionsPDF
                resumeText={item.resumeText}
                suggestions={item.suggestions}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default HistoryPage;
