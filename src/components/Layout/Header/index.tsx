import { Button } from "@mantine/core";
import { camelCase } from "lodash";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import LogoIcon from "../Logo/LogoIcon";
import LogoText from "../Logo/LogoText";

const Header = () => {
  const { t } = useTranslation("common");
  const isDark = false;

  return (
    <header className="absolute flex justify-between px-3 py-8 w-full top-0 z-[100] bg-transparent text-white">
      <Link href="/">
        <a className="flex justify-start items-center">
          <LogoIcon className="w-9 h-9 mx-2" />
          <LogoText className="w-[200px]" />
        </a>
      </Link>

      <div className="links flex justify-between items-center flex-[0.7]">
        <div className="pages flex flex-1 justify-end items-center">
          {["Home", "About", "Pricing"].map((link) => (
            <Link href={`/${camelCase(link)}`} key={link}>
              <a className="hover:bg-white hover:bg-opacity-10 mx-2 px-3 py-1 rounded-md">
                {t(camelCase(link))}
              </a>
            </Link>
          ))}
        </div>
        <div className="external-links flex flex-1 justify-center items-center">
          <Link href="/signin">
            <a className="hover:underline mx-2">{t("signin")}</a>
          </Link>
          <Link href="/freetrial">
            <a className="mx-2">
              <Button color="white" variant="light">
                {t(camelCase("Start Free Trial"))}
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
