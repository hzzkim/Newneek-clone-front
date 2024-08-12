import React, { useEffect } from "react";
import '../assets/styleSheet.css';
import StickyNav from "../components/StickyNav";
import { Outlet, useLocation } from "react-router-dom";

const MainPage = () => {
    const location = useLocation();

    useEffect(() => {
        // 페이지가 변경될 때마다 최상단으로 스크롤
        window.scrollTo(0, 0);
    }, [location]);

    // 특정 경로에서만 StickyNav를 렌더링
    const showStickyNav = ['/articles', '/', '/posts'].includes(location.pathname);

    return (
        <div className="relative flex min-h-screen w-full max-w-screen-xl flex-1 flex-row mx-auto my-0 pl-safe-left-4 pr-safe-right-4 pt-16 md:pl-safe-left-3 md:pr-safe-right-3">
            <div className='flex max-w-screen-sm w-full mx-auto md:px-9 md:border-x md:border-x-gray-100'>
                <div className="flex flex-col">
                {showStickyNav && <StickyNav />}
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default MainPage;
