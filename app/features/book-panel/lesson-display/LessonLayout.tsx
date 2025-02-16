import type { PropsWithChildren } from "react";
import type { Lesson } from "~/lessons";

interface Props {
  lesson: Lesson;
}

const LessonLayout = ({ lesson, children }: PropsWithChildren<Props>) => {
  return (
    <div>
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-md border-2 border-orange-600 flex justify-center items-center">
          <h2 className="text-orange-600">
            {lesson.unit}
            {lesson.code}
          </h2>
        </div>
        <div>
          <p className="text-orange-600">{lesson.field}</p>
          <h2>{lesson.name}</h2>
          <p className="text-xs">I can {lesson.objectives}</p>
        </div>
      </div>
      <hr className="mt-3 mb-8 text-neutral-600" />
      {children}
    </div>
  );
};

export default LessonLayout;
