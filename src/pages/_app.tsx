import type { AppProps } from "next/app";
import { ThemeProvider, CssBaseline } from "@mui/material";
import darkTheme from "@/theme";
import "@/styles/globals.css";
import "@/icons";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
