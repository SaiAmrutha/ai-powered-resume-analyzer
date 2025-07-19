import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { calculateMatchScore } from "../utils/calculateMatchScore";
import { GEMINI_API_KEY } from "../utils/constants";
import { extractPdfText } from "../utils/extractPdfText";
import { formatSuggestionsToHTML } from "../utils/formatSuggestions";
import CompareResumeModal from "./CompareResumeModal";
import InsightsModal from "./InsightsModal";
import InsightsPage from "./InsightsPage";
import { SuggestionsPDF } from "./SuggestionsPDF";

function HomePage() {
  const [files, setFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [message, setMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(null);
  const [matchScore, setMatchScore] = useState(null);
  const [suggestions, setSuggestions] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [showCompareModal, setShowCompareModal] = useState(false);
  const suggestionsRef = useRef(null);
  const [activeTab, setActiveTab] = useState("analyzer");
  const [showInsightsModal, setShowInsightsModal] = useState(false);

  // file upload section for PDF or docx
  const {
    getRootProps,
    getInputProps,
    open: openFileDialog,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      const validFiles = acceptedFiles.filter(
        (file) => file.type === "application/pdf" || file.name.endsWith(".docx")
      );

      if (validFiles.length > 0) {
        setFiles(validFiles);
        setMessage("");
        setSuggestions(""); //clears old suggestions
        setMatchScore(null); //clear old score
        setExtractedText(""); //optionally clear extracted text
        setUploadProgress(null); //reset progress bar if needed
      } else {
        setMessage("Only pdf and docx files are allowed.");
      }
    },
    accept: {
      "application/pdf": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
    noClick: false, //enables click on dropzone
    noKeyboard: false, //enables keyboard interaction
  });

  // submit button functionality
  const handleSubmit = async () => {
    let resumeText = "";
    let score = 0;
    let suggestion = "";

    if (files.length === 0 && jobDescription.trim() === "") {
      setMessage("Please upload a resume and enter job description.");
      return;
    } else if (files.length === 0) {
      setMessage("Please upload a resume.");
      return;
    } else if (jobDescription.trim() === "") {
      setMessage("Please enter job description.");
      return;
    }

    try {
      setMessage("Extracting text...");
      resumeText = await extractPdfText(files[0]);
      setExtractedText(resumeText);

      score = calculateMatchScore(resumeText || "", jobDescription || "");
      setMatchScore(score);
      setMessage("Fetching AI suggestions from Gemini...");

      suggestion = await fetchGeminiSuggestions(resumeText, jobDescription);
      setSuggestions(suggestion);
      setMessage("Resume analyzed successfully!");

      const historyEntry = {
        id: Date.now(), //unique
        resumeName: files[0]?.name || "Unnamed",
        resumeText,
        jobDescription,
        suggestions: suggestion,
        matchScore: score, //using the local variable and not the state
        timestamp: new Date().toISOString(),
      };

      const prevHistory =
        JSON.parse(localStorage.getItem("resumeHistory")) || [];
      localStorage.setItem(
        "resumeHistory",
        JSON.stringify([historyEntry, ...prevHistory])
      );
    } catch (error) {
      console.error("Error during file handling:", error);
      setMessage("Something went wrong while analyzing the resume.");
    }
  };

  const handleCompareClick = () => {
    setShowCompareModal(true);
  };

  // geminiAPI call to get AI suggestions
  const fetchGeminiSuggestions = async (resumeText, jobDescription) => {
    const prompt = `Here is a resume:\n${resumeText}\n\nAnd here is a job description:\n${jobDescription}\n\nSuggest resume improvements to better match the job description.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    const data = await response.json();
    const suggestion = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return suggestion || "No AI suggestions available.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-400 to-yellow-400">
      <button
        onClick={() => (window.location.href = "/")}
        className="bg-gray-500 text-white text-3xl font-bold m-3 px-2 py-2 rounded-lg hover:bg-gray-800"
      >
        Main 🏢
      </button>

      <div className="p-5 font-sans max-w-5xl mx-auto">
        {activeTab === "analyzer" && (
          <>
            <h1 className="text-5xl font-bold pt-5 mb-5 mt-[-8%] text-center">
              AI-Powered Resume Analyzer
            </h1>
          </>
        )}
        {activeTab === "insights" && (
          <div>
            <InsightsPage />
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => (window.location.href = "/history")}
            // className="absolute top-5 right-6 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-900"
            className="bg-gray-500 text-white text-3xl font-bold px-2 py-2 mb-5 rounded-lg hover:bg-gray-800"
          >
            View History ⏲
          </button>

          <button
            onClick={() => setShowInsightsModal(true)}
            className="bg-gray-500 text-white text-3xl font-bold px-2 py-2 mb-5 rounded-lg hover:bg-gray-800"
          >
            Insights 📊
          </button>
        </div>

        {/* dropzone */}
        <div
          {...getRootProps()}
          className="border-4 border-dashed border-green-600 p-6 rounded-lg mb-5 flex flex-col items-center"
        >
          <input {...getInputProps()} />
          <p className="text-lg font-semibold mb-2">
            Drag and drop a file or click on the upload file button below.
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openFileDialog();
            }}
            className="bg-green-400 font-bold text-white px-4 py-2 rounded-md hover:bg-green-800"
          >
            Upload File
          </button>
        </div>

        {/* upload progress */}
        {uploadProgress !== null && (
          <div className="w-full bg-gray-400 h-5 rounded mb-4">
            <div
              className="bg-green-600 h-5 text-white text-center text-sm rounded"
              style={{ width: `{uploadProgress}%` }}
            >
              {uploadProgress}%
            </div>
          </div>
        )}

        {/* display uploaded file name */}
        {files.map((file, index) => (
          <p key={index} className="text-sm mb-1">
            {file.name}
          </p>
        ))}

        {/* job description input */}
        <div className="mb-6">
          <label className="block text-3xl font-bold mb-2 text-center">
            Job Description
          </label>
          <textarea
            placeholder="Paste job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-64 p-4 border-8 border-gray-500 rounded text-base"
          ></textarea>

          {/* word + character count display */}
          <div className="flex justify-between text-sm text-gray-600">
            <p>
              Word count -{" "}
              {jobDescription.trim().split(/\s+/).filter(Boolean).length}
            </p>
            <p>Characters - {jobDescription.length}</p>
          </div>

          {/* word count validation message */}
          {jobDescription.trim().split(/\s+/).filter(Boolean).length < 30 && (
            <p className="text-red-600 text-lg mt-1">
              Minimum 30 words required to analyze effictively.
            </p>
          )}

          {jobDescription.trim().split(/\s+/).filter(Boolean).length > 400 && (
            <p className="text-yellow-500 text-lg mt-1">
              Job description is too long. Consider trimming to under 400 words.
            </p>
          )}
        </div>

        {/* Match score */}
        {matchScore !== null && (
          <p
            className={`text-xl font-bold mb-4 text-center ${
              matchScore >= 70
                ? "text-green-600"
                : matchScore >= 40
                ? "text-yellow-500"
                : "text-red-600"
            }`}
          >
            MATCH SCORE - {matchScore}%
          </p>
        )}

        {/* AI Suggestions + Compare Button */}
        {suggestions && (
          <div
            className="border-2 border-blue-600 p-4 rounded bg-slate-400 mt-5"
            ref={suggestionsRef}
          >
            <h3 className="text-3xl font-semibold mb-2">
              Resume Improvement Suggestions:
            </h3>
            <div
              className="whitespace-pre-wrap text-sm"
              dangerouslySetInnerHTML={{
                __html: formatSuggestionsToHTML(suggestions),
              }}
            ></div>

            <SuggestionsPDF
              resumeText={extractedText}
              suggestions={suggestions}
            />

            {/* compare button */}
            <button
              className="bg-green-800 font-bold text-white px-4 py-2 mt-3 rounded-md hover:bg-green-400"
              onClick={handleCompareClick}
            >
              Compare Resume
            </button>
          </div>
        )}

        {/* Compare Modal */}
        {showCompareModal && (
          <CompareResumeModal
            isOpen={true}
            originalText={extractedText}
            suggestedText={suggestions}
            onClose={() => setShowCompareModal(false)}
          />
        )}

        {/* Insights modal */}
        {showInsightsModal && (
          <InsightsModal onClose={() => setShowInsightsModal(false)} />
        )}

        <button
          onClick={handleSubmit}
          className="mt-6 font-bold bg-blue-400 hover:bg-blue-800 text-white  px-6 py-3 rounded-md shadow"
        >
          Submit
        </button>

        {message && (
          <p className="mt-4 text-center text-4xl font-bold p-3 bg-slate-500 text-blue-950">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
export default HomePage;
