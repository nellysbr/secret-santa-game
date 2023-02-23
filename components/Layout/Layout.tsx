import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex h-screen flex-col">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
