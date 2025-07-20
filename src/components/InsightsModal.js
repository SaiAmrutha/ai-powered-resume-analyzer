import DarkModeToggle from "./DarkModeToggle";
import InsightsPage from "./InsightsPage";

const InsightsModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-[70vw] h-[70vh] overflow-y-auto relative shadow-xl dark:text-white transition-colors duration-500">
        {/* close button */}

        <DarkModeToggle />
        <button
          onClick={onClose}
          className="absolute top-5 p-5 right-8 text-gray-600 hover:text-black text-5xl"
        >
          ❌
        </button>

        <InsightsPage />
      </div>
    </div>
  );
};

export default InsightsModal;
