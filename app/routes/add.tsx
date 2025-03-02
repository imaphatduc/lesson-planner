import { PanelWrapper } from "~/features/panel";
import { PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { LessonUploader } from "~/features/lesson-uploader";
import { AddLesson } from "~/features/add-lesson";
import { use, useState, type FormEvent } from "react";
import type { Lesson } from "~/contexts";
import { MyLessonsContext } from "~/contexts/MyLessonsContext";
import { Form, useNavigate } from "react-router";
import { v4 as uuid } from "uuid";
import { useLocalStorage } from "usehooks-ts";

export default function Add() {
  const { addLesson } = use(MyLessonsContext);

  const [pendingLesson, setPendingLesson] = useLocalStorage<Lesson>(
    "pending-lesson",
    {
      id: uuid(),
      name: "",
      code: "",
      objectives: {
        book: "",
        knowledge: "",
        ability: "",
        behavior: "",
      },
      book: "Friends Global",
      grade: 0,
      unit: 0,
      unitName: "",
      page: 0,
      image: "",
      targetLanguageItems: [
        {
          id: 0,
          name: "#1",
        },
      ],
      tasks: [],
      currentStep: 0,
    }
  );

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addLesson(pendingLesson);
    navigate(`/planning/${pendingLesson.id}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <PanelGroup direction="horizontal">
        <PanelWrapper type="book">
          <LessonUploader
            pendingLesson={pendingLesson}
            setPendingLesson={setPendingLesson}
          />
        </PanelWrapper>
        <PanelResizeHandle className="flex items-center">
          <div className="w-1 h-20 bg-neutral-400 rounded-full"></div>
        </PanelResizeHandle>
        <PanelWrapper type="practice">
          <div className="space-y-5">
            <AddLesson
              pendingLesson={pendingLesson}
              setPendingLesson={setPendingLesson}
            />
            <button
              type="submit"
              className="cursor-pointer px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
            >
              Add lesson
            </button>
          </div>
        </PanelWrapper>
      </PanelGroup>
    </Form>
  );
}
