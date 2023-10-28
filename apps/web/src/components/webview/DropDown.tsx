type DropDownProps = {
  children?: React.ReactNode;
  className?: string;
  onSelect: React.ChangeEventHandler<HTMLSelectElement>;
};

const DropDown: React.FC<DropDownProps> = ({ children, onSelect }) => {
  return (
    <div>
      <select
        id="evidence"
        className="bg-inherit focus:outline-none outline-none"
        onChange={onSelect}
      >
        {children}
      </select>
    </div>
  );
};

export default DropDown;
