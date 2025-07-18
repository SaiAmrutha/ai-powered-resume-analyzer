import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/analyzer"); //takes us to the resume-analyzer page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-green-600 flex items-center justify-center">
      <div className="text-center max-w-2xl p-10 bg-white shadow-2xl rounded-2xl border border-gray-600">
        <h1 className="text-5xl font-bold">
          Want to boost your resume with AI?
        </h1>
        <span className="text-sm pt-3">
          "Your resume deserves to shine. Let AI help it stand out."
        </span>
        <p className="text-lg font-semibold text-gray-800 mb-8 pt-3">
          Get tailored resume improvement suggestions with the power of{" "}
          <span className="font-extrabold">Gemini AI! </span>
          Our Resume Analyzer matches your resume to any job description and
          helps you update it with the right skills and keywords — making you
          stand out to recruiters. Click below to get started and let AI
          optimize your resume for the job you want.
        </p>

        <button
          onClick={handleGetStarted}
          className="bg-green-600 px-6 py-3 text-xl font-semibold rounded-full text-white hover:bg-green-800 transition duration-300"
        >
          Let's Get Started ✨
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
