import {
  blockEnum,
  Render,
  withContentValidation,
} from "@9gustin/react-notion-render";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Prism } from "@mantine/prism";
import { useRouter } from "next/router";
import { Hero } from "../../components/Hero";
import { useTheme } from "../../providers/ThemeProvider";
import { useNotionPage } from "../../hooks/useNotionPage";

const Page: NextPage = () => {
  const router = useRouter();

  const page = useNotionPage(router.query.id as string);

  return (
    <>
      <Head>
        <title>Articles | Craig Forrest</title>
      </Head>
      <Hero title={page?.title ?? "loading"} description="" />

      <section className="mt-16">
        {page && (
          <Render
            useStyles
            classNames
            blocks={page.blocks as any}
            blockComponentsMapper={{
              [blockEnum.HEADING2]: withContentValidation(({ plainText }) => (
                <h2 className="text-2xl sm:text-5xl lg:text-4xl mb-2">
                  {plainText}
                </h2>
              )),
              [blockEnum.CODE]: withContentValidation(({ plainText }) => {
                const { isDark } = useTheme();

                return (
                  <Prism
                    colorScheme={isDark ? "dark" : "light"}
                    language="typescript"
                  >
                    {plainText}
                  </Prism>
                );
              }),
            }}
          />
        )}
      </section>
    </>
  );
};

export default Page;
//
// type Props = {
//   title: string;
//   blocks: Awaited<ReturnType<typeof getBlocks>> | null;
// };

// export const getServerSideProps: GetServerSideProps<Props> = async ({
//   query,
// }) => {
//   const databaseId = process.env.NOTION_DATABASE_ID;
//
//   assert(
//     typeof databaseId === "string",
//     `database ID: "${databaseId}" is not valid`
//   );
//
//   const database = await getDatabase();
//   const regExp = new RegExp(`notion.so/${query.id}-[0-9a-f]{32}`, "i");
//   const page = database.find(
//     (response) => "url" in response && regExp.test(response.url)
//   );
//
//   if (!page) {
//     database.forEach((response) => {
//       if ("url" in response) {
//         console.log(response.url);
//       }
//     });
//   }
//
//   return {
//     props: {
//       blocks: page ? await getBlocks(page.id) : null,
//       // eslint-disable-next-line no-nested-ternary
//       title: page
//         ? "properties" in page
//           ? (page.properties.Name as any).title[0]?.plain_text
//           : ""
//         : "",
//     },
//   };
// };
