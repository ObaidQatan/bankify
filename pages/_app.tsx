import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import SEO from "../src/components/SEO";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { rtlCache } from "./_document";
import useTranslation from "next-translate/useTranslation";
import NextNProgress from "nextjs-progressbar";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import Loading from "../src/components/common/Loading";

function MyApp({ Component, pageProps }: AppProps) {
  const { lang, t } = useTranslation();
  console.log({ lang });

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"}>
      <NextNProgress />
      <Head>
        <title>{t("common:appName")}</title>
        <link rel="icon" href="/favicon.ico" />
        <SEO />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ColorSchemeProvider colorScheme={"dark"} toggleColorScheme={() => {}}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          emotionCache={rtlCache}
          theme={{
            dir: lang === "ar" ? "rtl" : "ltr",
            defaultRadius: 5,
            colorScheme: "dark",
            fontFamily: lang === "ar" ? "Cairo" : "Nunito",
            colors: {
              "primary-start": [
                "#8E54E9",
                "#8E54E9",
                "#8E54E9",
                "#8E54E9",
                "#8E54E9",
                "#8E54E9",
                "#8E54E9",
                "#7947c7",
                "#7947c7",
                "#8E54E9",
              ],
              dark: [
                "#aaa",
                "#aaa",
                "#aaa",
                "#aaa",
                "#aaa",
                "#403e5d",
                "#403e5d",
                "#403e5d",
                "#403e5d",
                "#403e5d",
              ],
            },
            primaryColor: "primary-start",
          }}
        >
          <ModalsProvider>
            <NotificationsProvider
              position={lang === "ar" ? "bottom-left" : "bottom-right"}
              zIndex={2077}
            >
              <RecoilRoot>
                <Toaster />
                <Loading />
                <Component {...pageProps} />
              </RecoilRoot>
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

export default MyApp;
