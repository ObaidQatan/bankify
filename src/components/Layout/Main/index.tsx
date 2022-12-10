import { ReactNode } from "react";

const Main = ({
  children,
  className,
}: {
  children: ReactNode[] | ReactNode;
  className?: string;
}) => {
  return (
    <main
      className={`min-h-[calc(100vh-6.4rem)] flex flex-col justify-center items-center ${
        /**"max-w-7xl"*/ ""
      } w-full`}
    >
      <div className={`flex flex-1 w-full ${className}`}>{children}</div>
    </main>
  );
};

export default Main;
