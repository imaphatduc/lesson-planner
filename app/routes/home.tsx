import { PanelWrapper } from "~/features/panel";
import { PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { use, useState } from "react";
import { MyLessonsContext } from "~/contexts/MyLessonsContext";
import { NavLink } from "react-router";
import { LessonProvider, lessonReference, type LessonCode } from "~/contexts";
import { StepThree } from "~/features/step-display/steps";

export default function Home() {
  const { myLessons } = use(MyLessonsContext);

  const [previewingLessonId, setPreviewingLessonId] = useState("");

  return (
    <PanelGroup direction="horizontal">
      <PanelWrapper type="book">
        <div className="space-y-5">
          <h2 className="text-red-400">My Lesson Plans</h2>
          <NavLink to="/add">
            <div className="rounded-md p-2 text-white bg-teal-700 hover:bg-teal-800 transition w-fit mb-5">
              Add lesson
            </div>
          </NavLink>
          <ul className="ml-5 space-y-3">
            {myLessons.map((lesson) => (
              <li
                key={lesson.id}
                className={
                  lesson.id === previewingLessonId
                    ? "list-disc border-l-4 border-teal-500 px-3"
                    : "list-disc"
                }
              >
                <p className="text-xs">
                  {lesson.book} {lesson.grade}
                  {" | "}
                  <span className="text-orange-300">
                    {lessonReference[lesson.code as LessonCode]}
                  </span>
                </p>
                <p
                  className="hover:underline underline-offset-4 cursor-pointer"
                  onClick={() => setPreviewingLessonId(lesson.id)}
                >
                  {lesson.unit}
                  {lesson.code} - {lesson.name} {lesson.no && `(${lesson.no})`}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </PanelWrapper>
      <PanelResizeHandle className="flex items-center">
        <div className="w-1 h-20 bg-neutral-400 rounded-full"></div>
      </PanelResizeHandle>
      <PanelWrapper type="practice">
        <h2 className="mb-5">Lesson Plan Preview</h2>
        {previewingLessonId && (
          <>
            <NavLink to={`/planning/${previewingLessonId}`}>
              <div className="rounded-md p-2 text-white bg-teal-700 hover:bg-teal-800 transition w-fit mb-5">
                Edit
              </div>
            </NavLink>
            <LessonProvider currentLessonId={previewingLessonId} defaultPreview>
              <StepThree />
            </LessonProvider>
          </>
        )}
      </PanelWrapper>
    </PanelGroup>
  );
}
