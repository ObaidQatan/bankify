interface Props {
  className?: string;
  children?: any;
  onClick?: () => void;
}

const RegularButton = ({ className, children, onClick, ...props }: Props) => {
  return (
    <button
      className={`bg-[#7267f0] text-white font-[Nunito] rounded-md py-2 px-5 shadow shadow-[#00000050] ${
        className && className
      }`}
      onClick={() => {
        onClick && onClick();
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default RegularButton;
