import React from 'react';  
import { useLocation, useNavigate } from 'react-router-dom';
import articles from '../articles';
import '../assets/MainStyles.css';

const Articles = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab') || 'all';

    // 필터링 탭
    const filterArticles = (filter) => {
        switch (filter) {
            case 'following':
                // 팔로잉 필터 조건 추가
                return articles.filter(article => article.isFollowing);
            case 'newneek':
                // 뉴닉 필터 조건 추가
                return articles.filter(article => article.isNewneek);
            case 'all':
            default:
                return articles;
        }
    };

    const currentFilter = tab;
    const filteredArticles = filterArticles(currentFilter); 

    const handleTabClick = (filter) => {
        navigate(`/articles?tab=${filter}`);
    };

    const handleArticleClick = (authorId, articleId) => {
        navigate(`/${authorId}/article/${articleId}`);
    }

    return (
        <div className='main-div flex flex-col max-w-screen-sm w-full mx-auto md:px-9 md:border-x md:border-x-gray-100'>
            <div className="tabs-container mb-4">
                <button className={`tab ${currentFilter === 'all' ? 'active' : ''}`} onClick={() => handleTabClick('all')}>전체</button>
                <button className={`tab ${currentFilter === 'following' ? 'active' : ''}`} onClick={() => handleTabClick('following')}>팔로잉</button>
                <button className={`tab ${currentFilter === 'newneek' ? 'active' : ''}`} onClick={() => handleTabClick('newneek')}>뉴닉</button>
            </div>
            {filteredArticles.map((article) => (
                <div 
                key={article.id} 
                className="article-container mb-4 cursor-pointer"
                onClick={() => handleArticleClick(article.authorId, article.id)}
                >
                    <div className="category">{article.category}</div>
                    <div className="title">{article.title}</div>
                    <img src={article.img} alt={article.title} className="thumbnail" />
                    <div className="content">{article.content}</div>
                    <div className="metadata">
                        <div className="writer-info">
                            {article.author}&nbsp;&nbsp;{article.time} · 읽음 {article.readCount}
                        </div>
                        <div className="interactions">
                            ❤️ {article.likes}  💬 {article.comments}  🔖 {article.bookmarks}
                        </div>
                    </div>
                    <hr className='divider'/>
                </div>
            ))}
        </div>
    );
};

export default Articles;
