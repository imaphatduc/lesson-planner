import { use } from "react";
import { LessonContext, usePPPProcedures } from "~/contexts";
import type { PPPStage, PPPStageGroup } from "~/contexts/usePPPProcedures";
import StageSection from "./StageSection";
import type { TargetLanguageItem } from "~/contexts/Lesson.type";

interface Props {
  group: PPPStageGroup;
  targetLanguageItem?: TargetLanguageItem;
}

const StageGroupSection = ({ group, targetLanguageItem }: Props) => {
  const { tasks, getTasksByStage } = use(LessonContext);

  const { getStage, getStagesInGroup } = usePPPProcedures();

  const firstTaskInDuplicateSequence = getStagesInGroup(group.name)
    .map((stage) => getTasksByStage(stage.name, targetLanguageItem?.id))
    .flat()
    .reduce<{ id: number; stageName: PPPStage["name"] }[]>((acc, curr) => {
      if (curr.stage && !acc.find((d) => d.id === curr.id)) {
        return [
          ...acc,
          {
            id: curr.id,
            stageName: curr.stage.name,
          },
        ];
      }

      return acc;
    }, []);

  const timing = tasks
    .map((task) =>
      task.stages
        .filter((stage) => getStage(stage.name).group === group.name)
        .map((stage) => stage.timing ?? 0)
    )
    .flat()
    .reduce((acc, d) => acc + d, 0);

  return (
    <>
      <tr>
        <td className="p-2">
          <p className="font-bold">{group.name}</p>
          <p>({timing} minutes)</p>
        </td>
        <td className=""></td>
        <td className=""></td>
      </tr>
      {getStagesInGroup(group.name).map((stage) => (
        <StageSection
          key={stage.name}
          stage={getStage(stage.name)}
          color={group.color}
          tasks={getTasksByStage(stage.name, targetLanguageItem?.id)}
          firstTaskInDuplicateSequence={firstTaskInDuplicateSequence}
        />
      ))}
      {group.name !== "Production" && <tr className="border-b"></tr>}
    </>
  );
};

export default StageGroupSection;
