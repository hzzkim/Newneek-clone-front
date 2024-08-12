import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/PostStyles.css';
import users from '../user';
import posts from '../posts';
import comment from '../comment'; 
import { formatDate } from '../format';

const PostPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab') || 'all';

    const loggedInUserId = 2; // 로그인한 사용자 ID
    const loggedInUser = users.find(user => user.id === loggedInUserId);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // 게시물 배열 평탄화
    const allPosts = posts.flatMap(userPosts => userPosts.posts);

    const filterPosts = (filter) => {
        switch (filter) {
            case 'following':
                return allPosts.filter(post => post.isFollowing);
            case 'news':
                return allPosts.filter(post => post.isNews);
            case 'all':
            default:
                return allPosts;
        }
    };

    const currentFilter = tab;
    const filteredPosts = filterPosts(currentFilter);

    const handleTabClick = (filter) => {
        navigate(`/posts?tab=${filter}`);
    };

    return (
        <div className='main-div flex flex-col max-w-screen-sm w-full mx-auto md:px-9 md:border-x md:border-x-gray-100'>
            {/* 탭 컨테이너 */}
            <div className="tabs-container mb-4">
                <button className={`tab ${currentFilter === 'all' ? 'active' : ''}`} onClick={() => handleTabClick('all')}>전체</button>
                <button className={`tab ${currentFilter === 'following' ? 'active' : ''}`} onClick={() => handleTabClick('following')}>팔로잉</button>
                <button className={`tab ${currentFilter === 'news' ? 'active' : ''}`} onClick={() => handleTabClick('news')}>뉴스</button>
            </div>

            {/* TypeField 컴포넌트 */}
            {loggedInUser && (
                <TypeField user={loggedInUser} onOpenModal={openModal} />
            )}

            {/* 포스트 목록 */}
            {filteredPosts.map((post) => {
                const user = users.find(user => user.id === post.userId);
                if (!user) {
                    console.error(`User not found for postId: ${post.postId}`);
                    return null;
                }

                // 포스트에 대한 댓글 필터링
                const postComments = comment.filter(c => c.postId === post.postId);

                // 최신 댓글 추출 및 정렬
                const latestComment = postComments
                    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

                // 최신 댓글에 대한 대댓글 추출
                const replies = postComments.filter(c => c.parentId === latestComment?.commentId);

                return (
                    <React.Fragment key={post.postId}>
                        {/* 게시물 */}
                        <PostOrCommentItem 
                            item={post} user={user} postComments={postComments} replies={[]} 
                        />

                        {/* 최신 댓글 */}
                        {latestComment && (
                            <div className="commentContainer">
                                <PostOrCommentItem 
                                    item={latestComment} user={users.find(u => u.id === latestComment.userId)} 
                                    postComments={[]} replies={replies} 
                                />
                                
                                {/* 최신 댓글에 대한 대댓글 */}
                                {replies.map(reply => (
                                    <PostOrCommentItem 
                                        key={reply.commentId} item={reply} user={users.find(u => u.id === reply.userId)} 
                                        postComments={[]} replies={[]} 
                                    />
                                ))}
                            </div>
                        )}
                        <div className="divider"></div>
                    </React.Fragment>
                );
            })}

            {/* 모달 */}
            {isModalOpen && <Modal onClose={closeModal} user={loggedInUser} />}
        </div>
    );
};

// 게시물 및 댓글 컴포넌트
const PostOrCommentItem = ({ item, user, postComments, replies }) => {
    if (!user) {
        console.error('User object is not defined.');
        return null;
    }

    const isPost = postComments.length > 0;
    const containerClass = isPost || replies.length > 0 ? 'postContainer' : 'commentContainer';

    return (
        <div className={containerClass}>
            {/* 프로필 */}
            <div className="postProfile mbS">
                <div className="postProfileImg">
                    <img src={user.profile} alt={user.name} />
                </div>
                <div>
                    <p>{user.name}</p>
                    <p className="fontS fontGrey">
                        {formatDate(item.date)}
                        &nbsp;∙&nbsp;<span className="fontS fontRed">팔로우</span>
                    </p>
                </div>
            </div>

            {/* 내용 */}
            <div className="postContent">
                <p className="fontS mbS">{item.content}</p>
                {item.img && <img src={item.img} alt={item.content} />}
                <Actions post={item} postComments={postComments} />
            </div>
        </div>
    );
};

const TypeField = ({ user, onOpenModal }) => (
    <div className='typeField'>
        <img src={user.profile} alt="Profile" />
        <button onClick={onOpenModal}>{user.name} 님의 생각을 나누며 지식을 넓혀 보세요</button>
    </div>
);

const Modal = ({ onClose, user }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className='modal-control'>
                    <select name="postSelection" id="0">
                        <option value="0">포스트 위치 선택</option>
                        <option value="1" selected>포스트 피드</option>
                        <option value="2"></option>
                    </select>
                    <button className="modal-close" onClick={onClose}>X</button>
                    <hr className='divider'/>
                </div>
                <div className="modal-content">
                    <div className='modalType'>
                        <img src={user.profile} alt="userProfile" style={{ width:'40px', height:'40px', borderRadius:'50%' }} />
                        <div className='modalField'>
                            <span className='contents'>
                                {user.name} 님의 생각을 나누며 지식을 넓혀 보세요
                            </span>
                        </div>
                    </div>
                    <footer className='modalFooter'>
                        <button style={{ position:'absolute', bottom: '60px', left:'40px', border:'none', background:'white', color:'black' }}>img</button>
                        <div style={{ position:'absolute', bottom:'30px', right: '40px', gap: '1rem', display: 'flex', flexDirection:'row', alignItems:'center' }}>
                            <p>0 / 300</p>
                            <button className="modal-submit">남기기</button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

const Actions = ({ post, postComments }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p className="likes">
            <button>좋아요</button>
            &nbsp;&nbsp;❤️‍🔥{post.likes}
        </p>
        <div className="postActions">
            <button className="actionBtn">💬 {postComments.length}</button>
            <button className="actionBtn">📁</button>
            <button className="actionBtn">🔗</button>
        </div>
    </div>
);

export default PostPage;
