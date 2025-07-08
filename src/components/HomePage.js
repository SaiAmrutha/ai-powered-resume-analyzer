import axios from "axios";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

function HomePage() {
  const [files, setFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [message, setMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(null);
  const [matchScore, setMatchScore] = useState(null);
  const [suggestions, setSuggestions] = useState("");
  const [extractedText, setExtractedText] = useState("");

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
    if (files.length === 0 || jobDescription.trim() === "") {
      setMessage("Please upload a resume and enter job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", files[0]); //use only the 1st file
    formData.append("jobDescription", jobDescription);

    try {
      setMessage("Uploading..");
      setUploadProgress(0);

      const response = await axios.post(
        "http://localhost:8080/api/resume/analyze-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            }
          },
        }
      );

      console.log("Match Score API response:", response.data); //debugging log

      setMatchScore(Math.round(response.data.matchScore)); //store matchsocre
      setSuggestions(response.data.aiSuggestions);
      setExtractedText(response.data.extractedText);
      setMessage("Resume analyzed successfully!");
      setUploadProgress(100);
    } catch (error) {
      console.error("Error during file upload:", error);
      setMessage("Error analyzing resume. Please try again");
      setUploadProgress(null);
    }
  };

  return (
    <div className="p-5 font-sans max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold mb-5 text-center">
        AI-Powered Resume Analyzer
      </h1>

      {/* dropzone */}
      <div
        {...getRootProps()}
        className="border-4 border-dashed border-green-600 p-6 rounded-lg mb-5 flex flex-col items-center"
      >
        <input {...getInputProps()} />
        <p className="text-lg font-semibold mb-2">Drag and drop a file or</p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openFileDialog();
          }}
          className="bg-green-600 hover:bg-green-600 text-white px-4 py-2 rounded"
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
        <lable className="block text-lg font-bold mb-2 text-center">
          Job Description
        </lable>
        <textarea
          placeholder="Paste job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full h-64 p-4 border-2 border-gray-500 rounded text-base"
        ></textarea>
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
          Match Score : {matchScore}%
        </p>
      )}

      {/* AI Suggestions */}
      {suggestions && (
        <div className="border-2 border-blue-500 p-4 rounded bg-blue-400 mt-5">
          <h3 className="text-lg font-semibold mb-2">
            Resume Improvement Suggestions:
          </h3>
          <pre className="whitespace-pre-wrap text-sm">{suggestions}</pre>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-500 hover:bg-blue-800 text-white text-xl px-6 py-3 rounded shadow"
      >
        Submit
      </button>
      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </div>
  );
}
export default HomePage;
