import React from 'react';
import Footer from '../modules/views/AppFooter';
import Header from '../modules/views/AppAppBar';

const LayoutDefault = ({ children }) => (
  <>
    <Header/>
    <main>
      {children}
    </main>
    <Footer />
  </>
);

export default LayoutDefault;  