import { Burger } from "@mantine/core";
import Card from "../Card";

const Dialog = ({
  closer,
  children,
  className,
  withMaxHeight,
}: {
  closer: any;
  className?: string;
  withMaxHeight?: boolean;
  children: any;
}) => {
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 h-screen w-screen bg-black bg-opacity-30 z-[2000]">
      <Card
        className={`wrapper p-5 rounded-md flex flex-col items-center ${
          withMaxHeight && "max-h-[500px]"
        } overflow-y-auto w-full max-w-[1000px] min-h-[500px]`}
        style={{
          boxShadow: "#00000050 0 0 5px 5px",
        }}
        withMotion
      >
        <div className="closer flex justify-start items-center w-full pb-5">
          <Burger
            opened={true}
            className={`hover:bg-[#ffffff20]`}
            size={15}
            color="gray"
            onClick={() => closer(false)}
          />
        </div>

        <div
          className={`content-here w-full h-full ${className && className} `}
        >
          {children}
        </div>
      </Card>
    </div>
  );
};

Dialog.defaultProps = {
  withMaxHeight: true,
};

export default Dialog;
