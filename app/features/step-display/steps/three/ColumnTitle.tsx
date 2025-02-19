interface Props {
  title: string;
}

const ColumnTitle = ({ title }: Props) => {
  return <div className="font-bold p-2">{title}</div>;
};

export default ColumnTitle;
