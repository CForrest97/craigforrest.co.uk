import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Hero } from "../components/Hero";

const Articles: NextPage = () => (
  <>
    <Head>
      <title>Articles | Craig Forrest</title>
    </Head>
    <Hero
      title="Articles ✍️"
      description="A space for me to write some articles..."
    />
  </>
);

export default Articles;
