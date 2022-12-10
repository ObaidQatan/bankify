import React from "react";
import { motion } from "framer-motion";

const Card = ({
  children,
  className,
  withMotion,
  ...props
}: {
  withMotion?: boolean;
  children: React.ReactNode[] | React.ReactNode;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) => {
  return withMotion ? (
    // @ts-ignore
    <motion.div
      className={`bg-[#403e5d] shadow-lg shadow-[#00000020] text-[#aaa] "border-[#00000050]"
       rounded-2xl ${className && className}`}
      // popup effect
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.05, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  ) : (
    <div
      className={`bg-[#403e5d] shadow-lg shadow-[#00000020] border-[#00000050] text-[#aaa] rounded-2xl ${
        className && className
      }`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
