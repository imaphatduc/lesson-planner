import {
  createContext,
  useEffect,
  useState,
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
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "~/db";

interface MyLessons {
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
  myLessons: Lesson[];
  getId: (metadata: LessonMetadata) => string;
  getLessonById: (id: string) => Lesson | undefined;
  addLesson: (d: Lesson) => void;
}

export const MyLessonsContext = createContext<MyLessons>({
  darkMode: false,
  setDarkMode: () => {},
  myLessons: [],
  getId: () => "",
  getLessonById: () => undefined,
  addLesson: () => {},
});

export const MyLessonsProvider = ({ children }: PropsWithChildren) => {
  const [darkMode, setDarkMode] = useLocalStorage("dark-mode", false);

  // const [ls] = useLocalStorage<Lesson[]>("my-lessons", []);
  // useEffect(() => {
  //   const _ = async () => {
  //     for (let l of ls) {
  //       await db.myLessons.add(l);
  //     }
  //   };
  //   _();
  // }, []);

  const myLessons = useLiveQuery(() => db.myLessons.toArray()) ?? [];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const addLesson = async (lesson: Lesson) => {
    await db.myLessons.add(lesson);
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
        getId,
        getLessonById,
        addLesson,
      }}
    >
      {children}
    </MyLessonsContext.Provider>
  );
};
