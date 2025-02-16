import type { Task } from "~/contexts/Task.type";
import { setCurrentLesson } from "../lesson/setCurrentLesson";
import type { LessonMetadata } from "~/contexts/Lesson.type";

export const setTasks =
  (metadata: LessonMetadata) => (set: (task: Task) => Task) => {
    setCurrentLesson(metadata)((lesson) => ({
      ...lesson,
      tasks: lesson.tasks.map(set),
    }));
  };
