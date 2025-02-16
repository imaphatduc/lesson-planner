import type { PropsWithChildren, ReactNode } from "react";

interface Props {
  order: number;
  question: ReactNode;
}

const QuestionLayout = ({
  order,
  question,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div className="space-y-2">
      <p>
        {order}. {question}?
      </p>
      {children}
    </div>
  );
};

export default QuestionLayout;
