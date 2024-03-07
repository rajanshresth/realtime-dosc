import Header from "@/components/landing-page/header";
import React, { PropsWithChildren } from "react";

const HomePageLayout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};

export default HomePageLayout;
