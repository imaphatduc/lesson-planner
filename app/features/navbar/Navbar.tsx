import { Moon, Sun } from "lucide-react";
import { use } from "react";
import { MyLessonsContext } from "~/contexts/MyLessonsContext";
import { Backup } from "../backup";

const Navbar = () => {
  const { darkMode, setDarkMode } = use(MyLessonsContext);

  return (
    <div className="flex gap-3 mt-4 ml-4">
      <button
        className="shadow-md p-2 hover:bg-neutral-300 hover:dark:bg-neutral-600 rounded-md cursor-pointer"
        onClick={() => (darkMode ? setDarkMode(false) : setDarkMode(true))}
      >
        {darkMode ? <Moon /> : <Sun />}
      </button>
      <Backup />
    </div>
  );
};

export default Navbar;
