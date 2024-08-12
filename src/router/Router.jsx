import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import Articles from '../components/Articles';
import Recommends from '../components/Recommends';
import Posts from '../components/Posts';
import ArticleDetail from '../pages/ArticleDetail';
import GroundList from '../components/ground/GroundList';
import GroundTest from '../components/ground/GroundTest';
import GroundDetail from '../components/ground/GroundDetail';
import Main from '../pages/Main'
import Series from '../pages/Series';
import Ground from '../pages/Ground';
import ImNew from '../pages/ImNew';
import Login from '../pages/Login';
import Signupform from '../pages/Signupform'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/series" element={<Series />} />
                <Route path="/ground" element={<Ground />} />
                <Route path="/imnew" element={<ImNew />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/sigupform" element={<Signupform />} />
            </Routes>

            <Routes>
                <Route path="/" element={<MainPage />}>
                    <Route index element={<Recommends />} />
                    <Route path="articles" element={<Articles />} />
                    <Route path="posts" element={<Posts />} />
                    <Route path="/:authorId/article/:articleId" element={<ArticleDetail />} />
                </Route>
            </Routes>
            <Routes>
                <Route path='/grounds' element={<GroundList />} />
                <Route path='/ground/:id' element={<GroundTest />} />
                <Route path='/:author/post/:post' element={<GroundDetail />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;