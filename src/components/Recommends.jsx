import React from 'react'; 
import '../assets/styleSheet.css';

// 샘플 포스트 데이터 (실제 데이터로 대체)
const samplePosts = [
    { id: 1, title: '포스트 제목 1', image: 'https://via.placeholder.com/280x160' },
    { id: 2, title: '포스트 제목 2', image: 'https://via.placeholder.com/280x160' },
    // 추가 포스트 데이터
]; 

const Recommends = () => {
    return (
        <div className='flex max-w-screen-sm w-full mx-auto md:px-9 md:border-x md:border-x-gray-100'>
            <div className='flex flex-col'>
                <div className='mb-4 border-b border-gray-100 pb-4'>
                    <div className='flex flex-col gap-3 py-3'>
                        <div className='flex items-center justify-between'>
                            <strong className='text-lg text-black font-bold md:text-xl'>지금 뜨는 뉴스</strong>
                            <a className='group inline-flex gap-1 rounded center transition-colors text-gray-500 pr-1 pl-2' href="/posts?tab=news">
                                더 보기
                            </a>
                        </div>
                        <div className='relative overflow-hidden'>
                            <div className='scroll-touch flex w-full flex-row overflow-x-auto whitespace-nowrap'>
                                <div className='flex gap-4'>
                                    <a className="" href="/"></a>
                                    <div style={{ width: '280px', height: '160px', backgroundColor: 'lightgray', borderRadius: '10px' }}></div>
                                </div>
                            </div>
                        </div>
                        <hr className='divider' />
                        <div className='mb-4 border-b border-gray-100 pb-4 last:border-none'>
                            <div className='flex flex-col gap-3 py-3'>
                                <div className='flex items-center justify-between'>
                                    <strong className='text-lg text-black font-bold md:text-xl'>뉴닉 아티클</strong>
                                    <a className='group inline-flex gap-1 rounded center transition-colors text-gray-500 pr-1 pl-2' href="/articles?tab=newneek">
                                        더 보기
                                    </a>
                                </div>
                            </div>
                        </div>
                        <hr className='divider' />
                        <div className='mb-4 flex flex-col gap-1.5 pt-3'>
                            <strong className='text-lg text-black font-bold md:text-xl'>추천 아티클</strong>
                            <p className='text-sm font-bold text-gray-600 md:text-base'>
                                뉴닉이 선정한 다양한 주제의 지식을 둘러보세요
                            </p>
                        </div>
                        <hr className='divider' />
                        <div className='mb-4 border-b border-gray-100 pb-4 last:border-none'>
                            <div className='flex flex-col gap-3 py-3'>
                                <div className='flex items-center justify-between'>
                                    <strong className='text-lg text-black font-bold md:text-xl'>추천 포스트</strong>
                                    <a className='group inline-flex gap-1 rounded center transition-colors text-gray-500 pr-1 pl-2' href="/posts?tab=news">
                                        더 보기
                                    </a>
                                </div>
                                <div className='relative overflow-hidden'>
                                    <div className='scroll-touch flex w-full flex-row overflow-x-auto whitespace-nowrap'>
                                        <div className='flex gap-4'>
                                            {samplePosts.map(post => (
                                                <div key={post.id} style={{ width: '280px', height: '160px', backgroundColor: 'lightgray', borderRadius: '10px' }}>
                                                    <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <hr className='divider' />
                                    <a className='block mb-4 border-b border-gray-100 pb-4 last:border-none' href="/">
                                        <article className='flex flex-col gap-3 py-2'>
                                            <div className='flex flex-col gap-3 md:flex-row md:gap-4'>
                                                <div className='relative aspect-[16\9] overflow-hidden md:h-[92px] md:w-[138px]'>
                                                    img
                                                </div>
                                                <div className='flex flex-1 flex-col gap-[10px] md:order-1'>
                                                    <h2 className='break-words text-xl font-bold text-gray-900'>title</h2>
                                                    <p className='line-clamp-2 break-all text-gray-500 md:line-clamp-3'>content</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col justify-between gap-3 md:flex-row md:items-center md:gap-0'>
                                                <div className='flex items-center gap-2'>
                                                    <div className='flex items-center gap-2'>
                                                        profile img
                                                        <div className='flex items-center gap-[3px]'>
                                                            <strong className='text-sm font-bold text-gray-700'>username</strong>
                                                            <span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex items-center gap-0.5 text-xs text-gray-500'>
                                                timestamp · readcount
                                                </div>
                                            </div>
                                            <div className='flex justify-end gap-3'>
                                                <span className='inline-flex items-center gap-1 text-xs text-gray-500'>L</span>
                                                <span className='inline-flex items-center gap-1 text-xs text-gray-500'>C</span>
                                                <span className='inline-flex items-center gap-1 text-xs text-gray-500'>B</span>
                                            </div>
                                        </article>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <hr className='divider' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recommends;
