import Link from "next/link";
import React, { FC } from "react";
import { Skeleton } from "@mantine/core";
import { Article } from "../models/Article";

type Props = { article: Article; isLoading: false } | { isLoading: true };

const LoadingArticleCard: FC = () => (
  <article>
    <div className="flex flex-col font-light w-full text-black dark:text-white mb-16">
      <div>
        <a
          className="text-pink-600 underline"
          style={{
            textUnderlineOffset: "3px",
            textDecorationThickness: "1px",
          }}
        >
          <Skeleton className="w-fit" radius="xl">
            <h2 className="items-center text-2xl sm:text-5xl lg:text-4xl mb-2">
              LOADING CONTENT
            </h2>
          </Skeleton>
        </a>
      </div>
    </div>
  </article>
);

const LoadedArticleCard: FC<{ article: Article }> = ({ article }) => (
  <article>
    <div className="flex flex-col font-light w-full text-black dark:text-white mb-16">
      <div>
        <Link href={`/articles/${article.slug}`}>
          <a
            className="text-pink-600 underline"
            style={{
              textUnderlineOffset: "3px",
              textDecorationThickness: "1px",
            }}
          >
            <h2 className="text-2xl sm:text-5xl lg:text-4xl mb-2">
              {article.title}
            </h2>
          </a>
        </Link>
      </div>
    </div>
  </article>
);

export const ArticleCard: FC<Props> = (props) =>
  props.isLoading ? (
    <LoadingArticleCard />
  ) : (
    <LoadedArticleCard article={props.article} />
  );
