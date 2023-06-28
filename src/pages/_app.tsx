// import "@/styles/globals.css";
import type { AppProps } from "next/app";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <header>
          <Nav />
        </header>
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </Provider>
  );
}
