import { use } from "react";
import { LessonContext } from "~/contexts";

const BookPanel = () => {
  const { metadata } = use(LessonContext);

  return (
    <div>
      <img className="w-full rounded-md" src={metadata.image} />
    </div>
  );
};

export default BookPanel;
