import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
