import { Fragment, use } from "react";
import { LessonContext, useGrammarProcedures, type Task } from "~/contexts";
import type { GrammarStageGroup } from "~/contexts/useGrammarProcedures";
import StageSection from "./StageSection";
import type { TargetLanguageItem } from "~/contexts/Lesson.type";

interface Props {
  group: GrammarStageGroup;
  targetLanguageItem?: TargetLanguageItem;
}

const StageGroupSection = ({ group, targetLanguageItem }: Props) => {
  const { tasks, getTasksByStage } = use(LessonContext);

  const { getStage } = useGrammarProcedures();

  const firstTaskInDuplicateSequence = group.stages
    .map((stageId) => getTasksByStage(stageId, targetLanguageItem?.id))
    .flat()
    .reduce<{ id: number; stageId: string }[]>((acc, curr) => {
      if (curr.stage && !acc.find((d) => d.id === curr.id)) {
        return [
          ...acc,
          {
            id: curr.id,
            stageId: curr.stage.id,
          },
        ];
      }

      return acc;
    }, []);

  const timing = tasks
    .map((task) =>
      task.stages
        .filter((stage) => stage.id.startsWith(group.id))
        .map((stage) => stage.timing ?? 0)
    )
    .flat()
    .reduce((acc, d) => acc + d, 0);

  return (
    <>
      <div className="p-2 ">
        <div className="font-bold">{group.name}</div>
        <div>({timing} minutes)</div>
      </div>
      <div className=""></div>
      <div className=""></div>
      {group.stages.map((stageId) => (
        <Fragment key={stageId}>
          <StageSection
            key={stageId}
            stage={getStage(stageId)}
            color={group.color}
            tasks={getTasksByStage(stageId, targetLanguageItem?.id)}
            firstTaskInDuplicateSequence={firstTaskInDuplicateSequence}
          />
        </Fragment>
      ))}
      <>
        <div className="border-b"></div>
        <div className="border-b"></div>
        <div className="border-b"></div>
      </>
    </>
  );
};

export default StageGroupSection;
