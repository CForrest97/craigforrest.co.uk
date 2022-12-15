import React from "react";
import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Layout } from "../components/Layout";
import { ThemeProvider, useTheme } from "../providers/ThemeProvider";
import { getArticles } from "../articles/services/client/getArticles";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  queryClient.prefetchQuery("articles", getArticles);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
