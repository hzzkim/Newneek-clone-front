import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../../assets/styleSheet.css';

function CateNav() { 
    const navigate = useNavigate();
    const location = useLocation();

    // 현재 경로가 버튼의 경로와 일치하는지 확인하는 함수
    const isActive = (path) => location.pathname === path;

    const handleClick = (path) => {
        navigate(path);
    };

    return (
        <div>
            <div className='sticky top-12 z-10 -mx-4 mb-5 bg-white pt-3 md:-mx-9 md:mb-6'>
                <div className='relative overflow-hidden'>
                    <div className='border-b border-gray-200 bg-white'>
                        <div className='relative overflow-hidden'>
                            <div className='scroll-touch flex w-full flex flex-row overflow-x-auto whitespace-nowrap'>
                                <div className='-mb-px flex px-4 pb-0.5 md:px-9 w-full gap-4'>
                                    {/* 시리즈 버튼 */}
                                    <button
                                        onClick={() => handleClick('/categories/seriescategory')}
                                        className={`nav-btn ${isActive('/categories/seriescategory') ? 'active' : ''}`}
                                    >
                                        시리즈
                                    </button>   
                                    {/* 그라운드 버튼 */}
                                    <button
                                        onClick={() => handleClick('/categories/groundcategory')}
                                        className={`nav-btn ${isActive('/categories/groundcategory') ? 'active' : ''}`}
                                    >
                                        그라운드
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CateNav;
