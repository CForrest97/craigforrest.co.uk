import React from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

type LinkProps = { path: string; name: string };

const ActiveTopLevelLink: React.FC<LinkProps> = ({ path, name }: LinkProps) => (
  <Link href={path}>
    <a className="text-gray-600 px-3 py-2 text-sm font-medium border-b-2 border-pink-600">
      {name}
    </a>
  </Link>
);

const InactiveTopLevelLink: React.FC<LinkProps> = ({
  path,
  name,
}: LinkProps) => (
  <Link href={path}>
    <a className="text-gray-600 px-3 py-2 text-sm font-medium border-b-2 hover:border-pink-600 border-opacity-0 hover:border-opacity-50 ">
      {name}
    </a>
  </Link>
);

const TopLevelLinks: React.FC = () => {
  const { asPath } = useRouter();

  const links = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blogs", path: "/blogs" },
  ];

  return (
    <nav className="flex space-x-4">
      {links.map(({ path, name }) => {
        const TopLevelLink =
          path === asPath ? ActiveTopLevelLink : InactiveTopLevelLink;
        return <TopLevelLink name={name} path={path} key={path} />;
      })}
    </nav>
  );
};

const Header: React.FC = () => (
  <header className="bg-white mx-auto px-3 md:px-36 lg:px-52 xl:px-80 flex items-center justify-between h-16 border-b-2 border-gray-200 fixed w-full">
    <Link href="/">
      <a className="text-gray-800 py-2 text-lg font-medium">Craig Forrest</a>
    </Link>
    <TopLevelLinks />
  </header>
);

export default Header;
