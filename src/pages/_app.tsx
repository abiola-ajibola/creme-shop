// import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";
import { store, persistor } from "@/redux/store";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const additionalThemes = {
  sizes: {
    md: "900px",
  },
  padding: {
    large: "32px",
    normal: "16px",
  },
};
declare module "@mui/material/styles" {
  /* eslint-disable no-unused-vars */
  interface Theme {
    _: typeof additionalThemes;
  }
  interface ThemeOptions {
    _: Partial<typeof additionalThemes>;
  }
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  _: additionalThemes,
});

const GlobalStyle = styled("div")`
  ${({ theme }) => `
    a {
        color: ${theme.palette.primary.main};
    }
    button a {
    color: initial;
    }    
    `}
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={darkTheme}>
          <SnackbarProvider>
            <CssBaseline />
            <header>
              <Nav />
            </header>
            <GlobalStyle>
              <Component {...pageProps} />
            </GlobalStyle>
            <Footer />
          </SnackbarProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
