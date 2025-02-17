import type { Task } from "~/contexts/Task.type";
import { setCurrentLesson } from "../lesson/setCurrentLesson";
import type { ActionProps } from "../../LessonContext";

export const setTasks = (props: ActionProps) => (set: (task: Task) => Task) => {
  setCurrentLesson(props)((lesson) => ({
    ...lesson,
    tasks: lesson.tasks.map(set),
  }));
};
