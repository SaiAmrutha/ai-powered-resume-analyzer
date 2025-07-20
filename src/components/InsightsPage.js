import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const InsightsPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("resumeHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const scores = history.map((item) => ({
    date: new Date(item.timestamp).toLocaleDateString(),
    score: item.matchScore,
  }));

  const lengthVsScore = history.map((item) => ({
    wordCount: item.resumeText.split(/\s+/).length,
    score: item.matchScore,
  }));

  const keywordMap = {};
  history.forEach((item) => {
    const matches = item.suggestions.match(/(?<=\* )\b\w+\b/g);
    matches?.forEach((word) => {
      keywordMap[word] = (keywordMap[word] || 0) + 1;
    });
  });

  const topKeywords = Object.entries(keywordMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));

  return (
    <div className="p-2 max-w-6xl mx-auto">
      <h1 className="text-6xl font-bold text-center mb-10 underline dark:text-white">
        Resume Insights Dashboard
      </h1>

      {/* Match Score Over Time */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 dark:text-white">
          Match Score Over Time
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={scores}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Line
              type="monotone"
              dataKey="score"
              stroke="blue"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Resume Legth vs Score */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 dark:text-white">
          {" "}
          Resume Length vs Match Score
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <XAxis dataKey="wordCount" name="Word Count" />
            <YAxis dataKey="score" name="Match Score" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <CartesianGrid />
            <Scatter data={lengthVsScore} fill="green" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Top Missing Keywords */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 dark:text-white">
          {" "}
          Most Frequently Missing Keywords
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topKeywords}>
            <XAxis dataKey="word" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="orange" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InsightsPage;
