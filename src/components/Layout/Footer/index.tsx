import { ReactNode } from "react";

const Footer = ({
  className,
  children,
}: {
  children: ReactNode[] | ReactNode;
  className?: string;
}) => {
  return (
    <footer
      className={`flex justify-between items-center w-full ${className}`}
      style={{
        background:
          "linear-gradient(269.96deg, #F2F2F2 4.2%, rgba(247, 247, 247, 0) 95.78%)",
      }}
    >
      {children}
    </footer>
  );
};

export default Footer;
