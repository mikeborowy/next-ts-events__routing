import type { AppProps } from "next/app";
import Head from "next/head";
import { AppProviders } from "../components/appProviders/";
import { Layout } from "../components/layout/";
import "../styles/globals.css";

function MyApp({ Component: PageComponent, pageProps }: AppProps) {
  return (
    <AppProviders>
      <Layout>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=width-device-"
          />
        </Head>
        <PageComponent {...pageProps} />
      </Layout>
    </AppProviders>
  );
}

export default MyApp;
