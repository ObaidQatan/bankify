import { ReactNode } from "react";

const PageWrapper = ({
  children,
  className,
}: {
  children: ReactNode[] | ReactNode;
  className?: string;
}) => {
  const isDark = false;

  return (
    <div
      className={`flex flex-col items-center ${
        isDark ? "bg-[#03101c] text-white" : "bg-[#fff] text-slate-600"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
