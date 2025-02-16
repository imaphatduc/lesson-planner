import { use } from "react";
import { LessonContext } from "~/contexts";
import type { TargetLanguageItem } from "~/contexts/Lesson.type";
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
    setStageGroup,
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
          sectionId="1"
          options={getGoodTasksForStageGroup("1").map((d) => d.id)}
          selectedOptions={getTasksByStageGroup("1", metadata.currentStep).map(
            (task) => task.id
          )}
          setSelectedOption={(groupId, taskId: number) =>
            setStageGroup(groupId, taskId)
          }
          removeSelectedOption={(taskId: number) =>
            removeTaskFromStageGroup("1", taskId)
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
          sectionId="2"
          options={getGoodTasksForStageGroup("2").map((d) => d.id)}
          selectedOption={
            getTasksByStageGroup("2", metadata.currentStep)[0]?.id
          }
          setSelectedOption={(groupId, taskId: number) =>
            setStageGroup(groupId, taskId)
          }
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
          sectionId="3"
          options={getGoodTasksForStageGroup("3").map((d) => d.id)}
          selectedOptions={getTasksByStageGroup("3", metadata.currentStep).map(
            (task) => task.id
          )}
          setSelectedOption={(groupId, taskId: number) =>
            setStageGroup(groupId, taskId)
          }
          removeSelectedOption={(taskId: number) =>
            removeTaskFromStageGroup("3", taskId)
          }
          display={display}
        />
      </QuestionLayout>
    </div>
  );
};

export default TargetLanguageItemSection;
