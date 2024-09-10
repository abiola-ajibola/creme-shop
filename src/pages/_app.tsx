// import "@/styles/globals.css";
import type { AppProps } from "next/app";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
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
    }`}
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <header>
          <Nav />
        </header>
        <GlobalStyle>
          <Component {...pageProps} />
        </GlobalStyle>
        <Footer />
      </ThemeProvider>
    </Provider>
  );
}
