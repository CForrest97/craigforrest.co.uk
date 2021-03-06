import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Hero } from "../components/Hero";

const Homepage: NextPage = () => (
  <>
    <Head>
      <title>Craig Forrest</title>
    </Head>
    <Hero
      title="Hello, I'm Craig 👋"
      description="I'm a software engineer at Cazoo, London"
    />
    <section className="mt-16"></section>
  </>
);

export default Homepage;
