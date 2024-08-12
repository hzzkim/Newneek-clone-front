import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Articles from '../components/Articles';
import Recommends from '../components/Recommends';
import Posts from '../components/Posts';
import ArticleDetail from '../pages/ArticleDetail';
import GroundList from '../components/ground/GroundList';
import GroundPost from '../components/ground/GroundPost';
import MainPage from '../pages/MainPage';
import ImNew from '../pages/ImNew';
import Login from '../pages/Login';
import SeriesPage from '../pages/SeriesPage';
import Signupform from '../pages/Signupform';
import SeriesDetail from "../components/series/SeriesDetail";
import GroundDetail from '../components/ground/GroundDetail';
import Grounds from '../pages/Grounds';
import Series from '../pages/Series';

const Router = () => {

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/imnew" element={<ImNew />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signupform" element={<Signupform />} />
      <Route path="/" element={<MainPage />}>
        <Route index element={<Recommends />} />
        <Route path="articles" element={<Articles />} />
        <Route path="posts" element={<Posts />} />
        <Route path=":authorId/article/:articleId" element={<ArticleDetail />} />
      </Route>

      <Route path="/" element={<Grounds />}>
        <Route path="grounds" element={<GroundList />} />
        <Route path="ground/:id" element={<GroundPost />} />
        <Route path=":author/post/:post" element={<GroundDetail />} />
      </Route>

      <Route path="/" element={<Series />}>
        <Route path="series" element={<SeriesPage />} />
        <Route path=":author/series/:seriesId" element={<SeriesDetail />} />
      </Route>

    </Routes>
  );
};

export default Router;
