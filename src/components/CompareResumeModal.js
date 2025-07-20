import { formatSuggestionsToHTML } from "../utils/formatSuggestions";
function CompareResumeModal({ isOpen, onClose, originalText, suggestedText }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-6xl shadow-lg relative">
        <button
          className="absolute top-2 right-4 text-gray-600 hover:text-black text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold mb-4 text-center text-blue-700">
          Resume Comparison
        </h2>
        <div className="grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
          <div>
            <h3 className="text-lg font-semibold underline text-yellow-500 mb-2">
              Original Resume
            </h3>
            <div
              className="whitespace-pre-wrap p-4 bg-gray-400 rounded overflow-y-auto text-sm"
              dangerouslySetInnerHTML={{
                __html: formatSuggestionsToHTML(
                  originalText || "No resume text extracted."
                ),
              }}
            ></div>
          </div>

          <div>
            <h3 className="text-lg font-semibold underline text-green-600 mb-2">
              Suggested Improvements
            </h3>

            <div
              className="whitespace-pre-wrap p-4 bg-gray-400 rounded overflow-y-auto text-sm"
              dangerouslySetInnerHTML={{
                __html: formatSuggestionsToHTML(
                  suggestedText || "No AI suggestions available."
                ),
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CompareResumeModal;
