import { camelCase, startCase } from "lodash";
import useTranslation from "next-translate/useTranslation";
import SdCard from "../../../icons/SdCard";

interface Props {
  className?: string;
  children?: any;
  onClick?: () => void;
}

const SaveButton = ({ className, children, onClick, ...props }: Props) => {
  const { t: tCommon } = useTranslation("common");

  return (
    <button
      data-tip={startCase(tCommon(camelCase("save")))}
      className={`done-btn rounded-md text-[#7367f0] bg-[#4c496e] shadow-sm px-5 py-2 my-2 text-sm hover:shadow-none hover:translate-y-1 `}
      onClick={() => {
        onClick && onClick();
      }}
    >
      {/** sd card icon */}
      <SdCard size={20} color={"#7367f0"} />
    </button>
  );
};

export default SaveButton;
