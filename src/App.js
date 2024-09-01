import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Router from './router/Router';
import Header from './template/Header';
import Footer from './template/Footer';
import 'react-quill/dist/quill.snow.css'; // Quill 에디터 기본 스타일

const App = () => {
  const location = useLocation();

  // 헤더를 숨길 경로
  const hideHeaderPaths = ['/article/edit'];
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Router />
      {!shouldHideHeader && <Footer />}
    </>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
