import { camelCase, startCase } from "lodash";
import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import RegularButton from "../src/components/common/Buttons/Regular";
import Card from "../src/components/common/Card";
import Logo from "../src/components/Layout/Logo";

const Home: NextPage = () => {
  const { t: tCommon } = useTranslation("common");

  return (
    <Card className="rounded-none border-none shadow-none h-screen flex flex-col justify-center items-center">
      <Logo />
      <RegularButton>
        <a href="/customers">
          {startCase(tCommon(camelCase("view all custoners")))}
        </a>
      </RegularButton>
    </Card>
  );
};

export default Home;
