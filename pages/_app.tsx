import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/layout/layout";
import Head from "next/head";

function MyApp({ Component: PageComponent, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=width-device-"
        />
      </Head>
      <PageComponent {...pageProps} />
    </Layout>
  );
}

export default MyApp;
