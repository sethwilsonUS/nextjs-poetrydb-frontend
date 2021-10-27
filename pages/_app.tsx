import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import { createTheme } from "@mui/material/styles";
import ButtonAppBar from "../components/navbar";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  React.useEffect(() => {

    const jssStyles = document.querySelector('#jss-ssr');

    if (jssStyles && jssStyles.parentElement) {
        jssStyles.parentElement.removeChild(jssStyles);
    }

  }, []);

  // Create a theme instance.
  const theme = createTheme({
    palette: {
      mode: "dark"
    },
  });

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <ButtonAppBar />
          <Component {...pageProps} />
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
}
