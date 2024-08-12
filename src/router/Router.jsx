import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import Articles from '../components/Articles';
import Recommends from '../components/Recommends';
import Posts from '../components/Posts';
import ArticleDetail from '../pages/ArticleDetail';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />}>
                    <Route index element={<Recommends />} />
                    <Route path="articles" element={<Articles />} />
                    <Route path="posts" element={<Posts />} />
                    <Route path="/:authorId/article/:articleId" element={<ArticleDetail />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;