import React from "react";
import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
import Layout from "../components/Layout";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
