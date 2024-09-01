import React from 'react';
import '../assets/styleSheet.css'; 
import '../assets/MainStyles.css'
import { useNavigate, useLocation } from 'react-router-dom';

function StickyNav() { 
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path) => location.pathname === path || (path === '/' && location.pathname === '/');

    const handleClick = (path) => {
        navigate(path);
    };

    return (
        <div className='sticky top-12 z-10 -mx-4 mb-5 bg-white pt-3 md:-mx-9 md:mb-6'>
            <div className='relative overflow-hidden'>
                <div className='border-b border-gray-200 bg-white'>
                    <div className='relative overflow-hidden'>
                        <div className='scroll-touch flex w-full flex flex-row overflow-x-auto whitespace-nowrap'>
                            <div className='-mb-px flex px-4 pb-0.5 md:px-9 w-full gap-4'>
                                <button
                                    onClick={() => handleClick('/')}
                                    className={`nav-btn ${isActive('/') ? 'active' : ''}`}
                                >
                                    추천
                                </button>
                                <button
                                    onClick={() => handleClick('/articles')}
                                    className={`nav-btn ${isActive('/articles') ? 'active' : ''}`}
                                >
                                    아티클
                                </button>
                                <button
                                    onClick={() => handleClick('/posts')}
                                    className={`nav-btn ${isActive('/posts') ? 'active' : ''}`}
                                >
                                    포스트
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StickyNav;
