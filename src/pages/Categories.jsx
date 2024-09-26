import React from "react";
import { Outlet } from "react-router-dom";
import '../assets/styleSheet.css';
import styles from '../assets/Main.module.css';
import CateNav from '../components/categories/CateNav';

function Categories() {
    return (
        <div className={styles.main}>
            <div className={styles.parent}>
                {/* 왼쪽 */}
                <div className={styles.child1}>
                </div>

                {/* 중앙 */}
                <div className='mx-auto flex w-full max-w-screen-sm main-content flex-col'>
                    {/* CateNav가 항상 출력 */}
                    <CateNav />
                    {/* Outlet을 통해 SeriesCate와 GroundCate가 출력 */}
                    <Outlet />
                </div>

                {/* 오른쪽 */}
                <div className={styles.child3}>
                    {/* 추가 요소 */}
                </div>
            </div>
        </div>
    );
}

export default Categories;
