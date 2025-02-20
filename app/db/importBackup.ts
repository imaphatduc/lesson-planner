import type { Lesson } from "~/contexts";
import { v4 as uuid } from "uuid";
import { db } from "./db";
import type { LessonMetadata } from "~/contexts/Lesson.type";

interface ImportedData {
  myLessons: Lesson[];
}

export const importBackup = async (
  file: File,
  myLessons: Lesson[],
  getLabel: (d: LessonMetadata) => string
) => {
  const reader = new FileReader();

  reader.onload = async (e) => {
    try {
      const result = e.target?.result;

      if (!result || typeof result !== "string") {
        throw new Error("Invalid file content.");
      }

      const importedData: ImportedData = JSON.parse(result);

      if (!importedData.myLessons) {
        throw new Error("Invalid data found in the file.");
      }

      const existingIds = new Set(myLessons.map((lesson) => lesson.id));

      const newItems = importedData.myLessons.map((lesson) => {
        if (existingIds.has(lesson.id)) {
          lesson.id = uuid();

          const sameLessonsLabels = myLessons.filter(
            (d) => getLabel(d) === getLabel(lesson)
          );

          lesson.no =
            sameLessonsLabels.length > 0 ? sameLessonsLabels.length : undefined;
        }

        return lesson;
      });

      // Insert items into IndexedDB
      await db.myLessons.bulkPut(newItems);

      alert("Lessons imported successfully!.");
    } catch (error) {
      console.error("Error importing database:", error);
    }
  };

  reader.readAsText(file);
};
