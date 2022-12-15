import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Hero } from "../../components/Hero";
import { ArticleCard } from "../../articles/components/ArticleCard";
import { useArticles } from "../../articles/hooks/useArticles";
import { Article } from "../../articles/models/Article";

const Index: NextPage = () => {
  const articles = useArticles();

  return (
    <>
      <Head>
        <title>Articles | Craig Forrest</title>
      </Head>
      <Hero
        title="Articles ✍️"
        description="A space for me to write some articles..."
      />

      <section className="mt-16">
        {articles ? (
          articles.map((article) => (
            <ArticleCard key={article.id} article={article} isLoading={false} />
          ))
        ) : (
          <ArticleCard isLoading />
        )}
      </section>
    </>
  );
};

export default Index;
