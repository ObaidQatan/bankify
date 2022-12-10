import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import Logo from "../Logo";

const Header = () => {
  const router = useRouter();

  return (
    <div className="header flex flex-row w-full h-16 bg-[#403e5d] border-b border-[#00000050] overflow-hidden">
      <div className="back-btn flex flex-row items-center justify-center w-16 h-full">
        <button
          className="flex items-center justify-center w-8 h-8 text-gray-300 rounded-full hover:bg-[#ffffff30] focus:outline-none focus:ring focus:ring-gray-200"
          onClick={() => router.back()}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </button>
      </div>
      <div className="flex-1 flex justify-end items-center translate-y-2 translate-x-5">
        <Logo size={120} />
      </div>
    </div>
  );
};

export default Header;
