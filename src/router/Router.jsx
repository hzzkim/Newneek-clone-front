import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Articles from "../components/Articles";
import Recommends from "../components/Recommends";
import Posts from "../components/Posts";
import ArticleDetail from "../pages/ArticleDetail";
import GroundList from "../components/ground/GroundList";
import GroundTest from "../components/ground/GroundTest";
import GroundDetail from "../components/ground/GroundDetail";
import SeriesPage from "../pages/SeriesPage";
import SeriesDetail from "../components/series/SeriesDetail";

const Router = () => {
  const [activeTab, setActiveTab] = useState("전체");

  const handleFilter = (tabName) => {
    console.log("Filtering tab:", tabName);
    setActiveTab(tabName);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<Recommends />} />
          <Route path="articles" element={<Articles />} />
          <Route path="posts" element={<Posts />} />
          <Route
            path="/:authorId/article/:articleId"
            element={<ArticleDetail />}
          />
        </Route>
      </Routes>
      <Routes>
        <Route path="/grounds" element={<GroundList />} />
        <Route path="/ground/:id" element={<GroundTest />} />
        <Route path="/:author/post/:post" element={<GroundDetail />} />
      </Routes>
      <Routes>
        <Route
          path="SeriesPage"
          element={<SeriesPage activeTab={activeTab} />}
        />
        <Route path="/SeriesDetail/:id" element={<SeriesDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
