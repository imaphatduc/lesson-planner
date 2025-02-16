import { Input, QuestionLayout, Selection } from "../input";
import { lessonReference, type Lesson, type LessonCode } from "~/contexts";

interface Props {
  pendingLesson: Lesson;
  setPendingLesson: (d: Lesson) => void;
}

const AddLesson = ({ pendingLesson, setPendingLesson }: Props) => {
  return (
    <div className="space-y-5">
      <h2 className="text-red-400">Add a new lesson</h2>
      <QuestionLayout order={1} question="Name">
        <Input
          onChange={(e) =>
            setPendingLesson({ ...pendingLesson, name: e.target.value })
          }
          required
        />
      </QuestionLayout>
      <QuestionLayout order={2} question="Language knowledge / skills">
        <Selection
          name="code"
          options={Object.keys(lessonReference)}
          setSelectedOption={(_, code: LessonCode) =>
            setPendingLesson({ ...pendingLesson, code })
          }
          display={(code: LessonCode) => `${code} - ${lessonReference[code]}`}
          required
        />
      </QuestionLayout>
      <QuestionLayout order={3} question="How many tasks">
        <Input
          type="number"
          onChange={(e) =>
            setPendingLesson({
              ...pendingLesson,
              tasks: [...Array(parseInt(e.target.value)).keys()].map((id) => ({
                id,
                instructions: "",
                stageGroups: [],
                stages: [],
              })),
            })
          }
          required
        />
      </QuestionLayout>
      <QuestionLayout order={4} question="Objectives">
        <Input
          onChange={(e) =>
            setPendingLesson({ ...pendingLesson, objectives: e.target.value })
          }
          required
        />
      </QuestionLayout>
      <QuestionLayout order={5} question="Book">
        <Selection
          name="book"
          options={["Friends Global"]}
          selectedOption={"Friends Global"}
          setSelectedOption={(_, book: Lesson["book"]) =>
            setPendingLesson({ ...pendingLesson, book })
          }
          display={(book: Lesson["book"]) => book}
          required
        />
      </QuestionLayout>
      <QuestionLayout order={6} question="Grade">
        <Input
          name="grade"
          type="number"
          onChange={(e) =>
            setPendingLesson({
              ...pendingLesson,
              grade: parseInt(e.target.value),
            })
          }
          required
        />
      </QuestionLayout>
      <QuestionLayout order={7} question="Unit">
        <Input
          name="unit"
          type="number"
          onChange={(e) =>
            setPendingLesson({
              ...pendingLesson,
              unit: parseInt(e.target.value),
            })
          }
          required
        />
      </QuestionLayout>
      <QuestionLayout order={8} question="Page">
        <Input
          type="number"
          onChange={(e) =>
            setPendingLesson({
              ...pendingLesson,
              page: parseInt(e.target.value),
            })
          }
          required
        />
      </QuestionLayout>
    </div>
  );
};

export default AddLesson;
