import { use } from "react";
import { LessonContext } from "~/contexts";
import type { TargetLanguageItem } from "~/contexts/Lesson.type";
import type { PPPStageGroup } from "~/contexts/usePPPProcedures";
import { MultipleSelection, QuestionLayout, Selection } from "~/features/input";
import { Input } from "~/features/input";

interface Props {
  targetLanguageItem: TargetLanguageItem;
}

const TargetLanguageItemSection = ({ targetLanguageItem }: Props) => {
  const {
    metadata,
    setCurrentTargetLanguageItem,
    getGoodTasksForStageGroup,
    setStageGroupForTask,
    getTasksByStageGroup,
    removeTaskFromStageGroup,
  } = use(LessonContext);

  const targetLanguageItemElement = (
    <span className="text-red-400">
      {targetLanguageItem.name || "target language item"}
    </span>
  );

  const display = (option: number) => `Task ${option + 1}`;

  return (
    <div className="space-y-5">
      <QuestionLayout order={0} question="What is the target language item">
        <Input
          defaultValue={targetLanguageItem.name}
          onChange={(e) =>
            setCurrentTargetLanguageItem(targetLanguageItem.id, e.target.value)
          }
        />
      </QuestionLayout>
      {/* 1.1. Does this task offer any practice for the target language item? */}
      <QuestionLayout
        order={1}
        question={
          <span>
            What task sets the context for the {targetLanguageItemElement}
          </span>
        }
      >
        <MultipleSelection
          sectionId="Setting context"
          options={getGoodTasksForStageGroup().map((d) => d.id)}
          selectedOptions={getTasksByStageGroup(
            "Setting context",
            targetLanguageItem.id
          ).map((task) => task.id)}
          setSelectedOption={(
            groupName: PPPStageGroup["name"],
            taskId: number
          ) => setStageGroupForTask(groupName, taskId)}
          removeSelectedOption={(taskId: number) =>
            removeTaskFromStageGroup("Setting context", taskId)
          }
          display={display}
        />
      </QuestionLayout>
      <QuestionLayout
        order={2}
        question={
          <span>What task conveys the {targetLanguageItemElement}</span>
        }
      >
        <Selection
          sectionId="Presentation"
          options={getGoodTasksForStageGroup().map((d) => d.id)}
          selectedOption={
            getTasksByStageGroup("Presentation", targetLanguageItem.id)[0]?.id
          }
          setSelectedOption={(
            groupName: PPPStageGroup["name"],
            taskId: number
          ) => setStageGroupForTask(groupName, taskId)}
          display={display}
        />
      </QuestionLayout>
      <QuestionLayout
        order={3}
        question={
          <span>
            What task(s) offer some practice for the {targetLanguageItemElement}
          </span>
        }
      >
        <MultipleSelection
          sectionId="Practice"
          options={getGoodTasksForStageGroup().map((d) => d.id)}
          selectedOptions={getTasksByStageGroup(
            "Practice",
            targetLanguageItem.id
          ).map((task) => task.id)}
          setSelectedOption={(
            groupName: PPPStageGroup["name"],
            taskId: number
          ) => setStageGroupForTask(groupName, taskId)}
          removeSelectedOption={(taskId: number) =>
            removeTaskFromStageGroup("Practice", taskId)
          }
          display={display}
        />
      </QuestionLayout>
    </div>
  );
};

export default TargetLanguageItemSection;
