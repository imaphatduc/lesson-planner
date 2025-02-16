import { PanelWrapper } from "~/features/panel";
import { PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { LessonProvider } from "~/contexts";
import { StepDisplay } from "~/features/step-display";
import { BookPanel } from "~/features/book-panel";
import { useParams } from "react-router";

export default function Planning() {
  const { lessonId } = useParams();

  return (
    lessonId && (
      <LessonProvider currentLessonId={lessonId}>
        <PanelGroup direction="horizontal">
          <PanelWrapper type="book">
            <BookPanel />
          </PanelWrapper>

          <PanelResizeHandle className="flex items-center">
            <div className="w-1 h-20 bg-neutral-400 rounded-full"></div>
          </PanelResizeHandle>

          <PanelWrapper type="practice">
            <StepDisplay />
          </PanelWrapper>
        </PanelGroup>
      </LessonProvider>
    )
  );
}
