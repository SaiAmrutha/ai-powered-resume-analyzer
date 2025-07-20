import { useDarkMode } from "../utils/useDarkMode";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  return (
    <div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-gray-500 text-white text-3xl font-bold m-3 px-2 py-2 rounded-lg hover:bg-gray-800"
      >
        {darkMode ? "🌙 Dark On" : "🌞 Light On"}
      </button>
    </div>
  );
};

export default DarkModeToggle;
