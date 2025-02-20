import { createContext, useEffect, type PropsWithChildren } from "react";
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
  getLabel: (metadata: LessonMetadata) => string;
  getLessonById: (id: string) => Lesson | undefined;
  addLesson: (d: Lesson) => void;
}

export const MyLessonsContext = createContext<MyLessons>({
  darkMode: false,
  setDarkMode: () => {},
  myLessons: [],
  getLabel: () => "",
  getLessonById: () => undefined,
  addLesson: () => {},
});

export const MyLessonsProvider = ({ children }: PropsWithChildren) => {
  const [darkMode, setDarkMode] = useLocalStorage("dark-mode", false);

  // const [ls] = useLocalStorage<Lesson[]>("my-lessons", []);
  // useEffect(() => {
  //   const _ = async () => {
  //     for (let l of ls) {
  //       const id = uuid();
  //       await db.myLessons.add({ ...l, id });
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

  const getLabel = (metadata: LessonMetadata) =>
    `${metadata.grade}-${metadata.book}-${metadata.unit}-${metadata.code}-${
      lessonReference[metadata.code as LessonCode]
    }`;

  const addLesson = async (lesson: Lesson) => {
    const sameLessonsLabels = myLessons.filter(
      (d) => getLabel(d) === getLabel(lesson)
    );

    await db.myLessons.add({
      ...lesson,
      no: sameLessonsLabels.length > 0 ? sameLessonsLabels.length : undefined,
    });
  };

  const getLessonById = (id: string) => {
    const lesson = myLessons.find((lesson) => lesson.id === id);

    return lesson;
  };

  return (
    <MyLessonsContext.Provider
      value={{
        darkMode,
        setDarkMode,
        myLessons,
        getLabel,
        getLessonById,
        addLesson,
      }}
    >
      {children}
    </MyLessonsContext.Provider>
  );
};
