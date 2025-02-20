import { backup, importBackup } from "~/db";
import { FileUploader } from "../file-uploader";
import { use } from "react";
import { MyLessonsContext } from "~/contexts/MyLessonsContext";

const Backup = () => {
  const { myLessons, getLabel } = use(MyLessonsContext);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      importBackup(file, myLessons, getLabel);
    }
  };

  return (
    <>
      <FileUploader
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
      >
        Import
      </FileUploader>
      <button
        className="p-2 text-white bg-neutral-700 rounded-sm hover:bg-neutral-800 cursor-pointer transition"
        onClick={async () => await backup(myLessons)}
      >
        Export
      </button>
    </>
  );
};

export default Backup;
