import React from "react";
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
