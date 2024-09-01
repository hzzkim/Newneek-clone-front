// App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
import Header from './template/Header';
import Footer from './template/Footer';
import 'react-quill/dist/quill.snow.css'; // Quill 에디터 기본 스타일

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Router />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
