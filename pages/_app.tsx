import Loading from "./loading";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Poppins } from "@next/font/google";
import { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import { Suspense, lazy, useEffect, useState } from "react";
import favicon from "./../public/icons/favicon.ico";
import { SessionProvider } from "next-auth/react";

const Header = lazy(() => import("../components/Header"));
const Footer = lazy(() => import("../components/Footer"));

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const GlobalStyle = createGlobalStyle`
:root {
  --light-color: 240, 246, 252;
  --dark-color: 2, 48, 71;
  --primary-color: 251, 133, 0;
  --primary-gradient-1: 255, 183, 3;
  --secondary-color: 33, 158, 188;
  --secondary-gradient-1: 142, 202, 230;
  --white-color: 255, 255, 255;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: var(--font-poppins, sans-serif);
  outline: none;
}
body {
  background-color: rgb(var(--dark-color));
  color: rgb(var(--light-color));
  overflow-x: hidden;
  scroll-behavior: smooth;
  transition: all 0.15s ease;
}
.container {
  margin-inline: auto;
  width: min(90%, 70rem);
}
.App {
  min-height: 100vh;
  display: grid;
  place-items: center;
}
::-webkit-scrollbar {
  width: 0.25em;
}
::-webkit-scrollbar-track {
  background: transparent;
  transition: all 0.15s ease;
}
::-webkit-scrollbar-track:hover {
  background: rgba(var(--dark-color), 0.01);
}
::-webkit-scrollbar-thumb {
  background: rgba(var(--light-color), 0.25);
  border-radius: 0.5rem;
}
a {
  text-decoration: none;
  color: inherit;
  transition: 0.15s;
}`;

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [domLoaded, setDomLoaded] = useState<boolean>(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Infotech Success Point</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon.src} />
      </Head>
      <GlobalStyle />
      <Suspense fallback={<Loading />}>
        {domLoaded && (
          <div className={poppins.variable}>
            <motion.div variants={container} initial="hidden" animate="show">
              <Header />
              <Component {...pageProps} />
              <Footer />
            </motion.div>
          </div>
        )}
      </Suspense>
    </SessionProvider>
  );
}
