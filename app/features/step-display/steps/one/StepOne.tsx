import { Fragment, use } from "react";
import { LessonContext } from "~/contexts";
import TargetLanguageItemSection from "./TargetLanguageItemSection";
import { Tabs } from "~/features/tabs";

const StepOne = () => {
  const {
    getCurrentTargetLanguageItem,
    setCurrentTargetLanguageItem,
    targetLanguageItems,
    addTargetLanguageItem,
    removeTargetLanguageItem,
  } = use(LessonContext);

  const addTab = () => {
    addTargetLanguageItem(`#${targetLanguageItems.length + 1}`);
  };

  const removeTab = (id: number) => {
    removeTargetLanguageItem(id);
  };

  return (
    <>
      <Tabs
        tabs={targetLanguageItems}
        activeId={getCurrentTargetLanguageItem().id}
        setActiveId={setCurrentTargetLanguageItem}
        addTab={addTab}
        removeTab={removeTab}
      >
        {targetLanguageItems.map((targetLanguageItem) => (
          <Fragment key={targetLanguageItem.id}>
            {targetLanguageItem.id === getCurrentTargetLanguageItem().id ? (
              <TargetLanguageItemSection
                targetLanguageItem={targetLanguageItem}
              />
            ) : (
              <></>
            )}
          </Fragment>
        ))}
      </Tabs>
    </>
  );
};

export default StepOne;
