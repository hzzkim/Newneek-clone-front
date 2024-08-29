import React from 'react';
import { useParams } from 'react-router-dom'; 
import articles from '../articles';
import '../assets/MainStyles.css';
import '../assets/styleSheet.css';
import Floatbar from '../components/FloatBar.js'; 

const ArticleDetail = () => {
    const { authorId, articleId } = useParams();
    const article = articles.find(
        (art) => art.id === parseInt(articleId) && art.authorId === authorId
    );

    if (!article) {
        return <div>Article not found</div>;
    }

    const handleShare = () => {
        // 공유 기능 추가
        alert('공유 버튼 클릭됨!');
    };

    const handleMoreOptions = () => {
        // 추가 옵션 기능 추가
        alert('추가 옵션 버튼 클릭됨!');
    };

    return (
        <div className='relative flex min-h-screen w-full flex-1 flex-col mx-auto my-0 pt-16'>
            <div className='flex flex-col pb-[106px] pt-5 md:pb-[88px] md:pt-8'>
                <div className='mx-auto w-full max-w-screen-sm px-4 md:px-0'>
                    <div className='relative mb-5 aspect-[16/9] md:mb-7'>
                        <img src={article.img} alt={article.title} className='ss-img image responsive-image rounded-lg bg-gray-200 object-cover object-center' />
                    </div>
                </div>
                <div className='flex flex-col gap-10'>
                    <div className='mx-auto w-full max-w-screen-sm md:px-0'>
                    <div className="mb-2 md:mb-3"><a className='h-7 rounded-md bg-gray-50 px-2 py-1 text-sm font-bold text-gray-700' href="/articles">{article.category}</a></div>
                    </div>
                </div>
                <h1 className='mb-4 break-words text-2xl font-bold text-gray-900 md:text-4xl md:font-extrabold'>{article.title}</h1>
                <div className="mt-4 flex items-center justify-between gap-4">
                    <div className='flex items-center gap-2'>
                        <a className='flex min-w-[28px]' href='/articles'>
                        <img alt="blankPic" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fplybs%2FbtsIVFRT2nU%2F17PKFo2lkYXClVfzPOteG1%2Fimg.webp"
                        className='profilSize rounded-full border-gray-200 bg-gray-200 object-cover object-center size-7'></img>
                        </a>
                        <div className='flex flex-1 flex-row gap-y-1 md:flex-row md:gap-2'>
                        <a className='flex flex-wrap items-center gap-x-[6px] gap-y-1' href='/articles'>
                        <div className='flex items-center gap-3'>
                            <strong className='line-clamp-1 text-sm font-bold'>{article.author}</strong>
                            <span></span>
                        </div>
                        </a>
                        <div className='flex items-center gap-1 text-xs text-gray-500'>
                            {article.time}
                            <span className='w-2 text-center text-2xs'>·</span>
                            읽음 {article.readCount} 
                        </div>
                        </div>               
                    </div>
                    <div className='flex items-center gap-4'>
                    <button onClick={handleShare}>
                        공유
                    </button>
                    <button onClick={handleMoreOptions} className='flex'>
                        ···
                    </button>
                    </div>
                </div>
                <div className='my-6 h-px w-full bg-gray0199 md:my-7'></div>
                <hr className='divider flex justify-center'/>
                <div className='relative'>
                    <div className='content'><p className='content'>{article.content}</p></div>
                </div>
            </div>
            <img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fw94Q8%2FbtsIS9e8Pkk%2FZtQ3kHPtaXgllhZUnWnhBk%2Fimg.jpg' alt='test' className='ss-img'></img>
            <img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbaqRoG%2FbtsITBhWVzQ%2FoSWXUmVR7KXGRsYrJoZIuK%2Fimg.png' alt='test' className='ss-img'></img>
            <div className='dummy mx-auto flex h-full flex-1 flex-col px-4 md:px-0 max-w-screen-sm'>
                시리즈 영역
            </div>
            <div className='dummy'>
                좋아요 영역
            </div>
            <div className='dummy'>
                프로필 영역
            </div>

            <Floatbar />
        </div>
    );
};

export default ArticleDetail;
