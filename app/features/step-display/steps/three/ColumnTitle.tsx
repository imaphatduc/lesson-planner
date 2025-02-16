interface Props {
  title: string;
}

const ColumnTitle = ({ title }: Props) => {
  return (
    <div className="font-bold flex text-center justify-center items-center p-2 border-b ">
      {title}
    </div>
  );
};

export default ColumnTitle;
