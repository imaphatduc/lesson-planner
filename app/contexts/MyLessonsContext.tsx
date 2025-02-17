import {
  createContext,
  useEffect,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from "react";
import {
  lessonReference,
  type Lesson,
  type LessonCode,
  type LessonMetadata,
} from "./Lesson.type";
import { useLocalStorage } from "usehooks-ts";

interface MyLessons {
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
  myLessons: Lesson[];
  setMyLessons: Dispatch<SetStateAction<Lesson[]>>;
  getId: (metadata: LessonMetadata) => string;
  getLessonById: (id: string) => Lesson | undefined;
  addLesson: (d: Lesson) => void;
}

export const MyLessonsContext = createContext<MyLessons>({
  darkMode: false,
  setDarkMode: () => {},
  myLessons: [],
  setMyLessons: () => {},
  getId: () => "",
  getLessonById: () => undefined,
  addLesson: () => {},
});

export const MyLessonsProvider = ({ children }: PropsWithChildren) => {
  const [myLessons, setMyLessons] = useLocalStorage<Lesson[]>("my-lessons", []);

  const [darkMode, setDarkMode] = useLocalStorage("dark-mode", false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const addLesson = (lesson: Lesson) => {
    setMyLessons([...myLessons, lesson]);
  };

  const getId = (metadata: LessonMetadata) =>
    `${metadata.grade}-${metadata.book}-${metadata.unit}-${metadata.code}-${
      lessonReference[metadata.code as LessonCode]
    }`;

  const getLessonById = (id: string) => {
    const [grade, book, unit, code] = id.split("-");

    const lesson = myLessons.find(
      (lesson) =>
        lesson.grade === parseInt(grade) &&
        lesson.book === book &&
        lesson.unit === parseInt(unit) &&
        lesson.code === code
    );

    return lesson;
  };

  return (
    <MyLessonsContext.Provider
      value={{
        darkMode,
        setDarkMode,
        myLessons,
        setMyLessons,
        getId,
        getLessonById,
        addLesson,
      }}
    >
      {children}
    </MyLessonsContext.Provider>
  );
};
