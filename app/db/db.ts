import Dexie, { type EntityTable } from "dexie";
import type { Lesson } from "~/contexts";

export const db = new Dexie("db") as Dexie & {
  myLessons: EntityTable<Lesson>;
};

db.version(1).stores({
  myLessons:
    "name,code,objectives,book,grade,unit,unitName,page,image,targetLanguageItems,tasks,currentStep",
});
