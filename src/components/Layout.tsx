import React from "react";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }: Props) => (
  <div>
    <Header />
    <div className="pt-16 px-3 md:px-36 lg:px-52 xl:px-80">{children}</div>
  </div>
);
export default Layout;
