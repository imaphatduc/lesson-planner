import type { Lesson } from "~/contexts";
import { db } from "./db";
import { format } from "date-fns";

export const backup = async (myLessons: Lesson[]) => {
  const blob = new Blob([JSON.stringify({ myLessons }, null, 2)], {
    type: "application/json",
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `lesson-planner-backup-${format(
    Date.now(),
    "HHmmssSSSddMMyyyy"
  )}.json`;
  a.click();
};
