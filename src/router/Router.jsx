import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Articles from '../components/Articles';
import Recommends from '../components/Recommends';
import Posts from '../components/Posts';
import ArticleDetail from '../pages/ArticleDetail';
import GroundList from '../components/ground/GroundList';
import PostList from '../components/ground/PostList';
import MainPage from '../pages/MainPage';
import ImNew from '../pages/ImNew';
import Login from '../pages/Login';
import SeriesPage from '../pages/SeriesPage';
import Signupform from '../pages/Signupform';
import SeriesDetail from "../components/series/SeriesDetail";
import PostDetail from '../components/ground/PostDetail';
import Grounds from '../pages/Grounds';
import Series from '../pages/Series';
import TestPage from '../pages/TestPage';  // 에디터 테스트용 페이지
import ArticleEdit from '../pages/ArticleEdit';
import Categories from '../pages/Categories';
import SeriesCate from '../components/categories/SeriesCate';
import GroundCate from '../components/categories/GroundCate';

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
        <Route path="ground/:id" element={<PostList />} />
        <Route path=":author/post/:post" element={<PostDetail />} />
      </Route>

      <Route path="/" element={<Series />}>
        <Route path="series" element={<SeriesPage />} />
        <Route path=":author/series/:seriesId" element={<SeriesDetail />} />
      </Route>

      <Route path='/article/edit' element={<ArticleEdit/>}/>

      <Route path="/test" element={<TestPage />} />  {/* TestPage 경로 추가 */}
      
      <Route path='/categories' element={<Categories />}>
        <Route path='seriescategory' element={<SeriesCate />} />
        <Route path='groundcategory' element={<GroundCate />} />
      </Route>
    </Routes>
  );
};

export default Router;
