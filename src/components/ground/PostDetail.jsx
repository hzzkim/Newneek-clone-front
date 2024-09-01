import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import users from '../../user';
import content from '../../content';
import ground from '../../ground';
import AuthorProfile from './AuthorProfile';
import PostOrCommentItem from './PostOrCommentItem';
import Modal from '../modal/Modal';
import PostContent from './PostContent';

function PostDetail() {
  const { author, post } = useParams();
  const [foundAuthor, setFoundAuthor] = useState(null);
  const [foundPost, setFoundPost] = useState(null);
  const [postComments, setPostComments] = useState([]);
  const [foundGround, setFoundGround] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 가상 데이터
  const loggedInUserId = 2;
  const loggedInUser = users.find(user => user.id === loggedInUserId);

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const authorId = parseInt(author);
    const postId = parseInt(post);
    const foundAuthor = users.find(user => user.id === authorId);
    const foundPost = content.find(post => post.id === postId);

    // foundPost가 존재하는 경우에만 groundId를 참조
    if (foundPost) {
      const foundGround = ground.find(ground => ground.id === foundPost.groundId);
      setFoundGround(foundGround);
    }

    const comments = content.filter(comment => comment.parentId === postId);

    setFoundAuthor(foundAuthor);
    setFoundPost(foundPost);
    setPostComments(comments);
  }, [author, post]);

  // foundAuthor, foundPost, foundGround가 모두 존재할 때만 렌더링
  if (!foundAuthor || !foundPost || !foundGround) {
    return <div>Loading...</div>;
  }

  // 댓글 필터링
  const comments = content.filter((content) => content.parentId === foundPost.id);
  const replies = (commentId) => content.filter((content) => content.parentId === commentId);

  const renderParentPost = () => {
    const parentPost = content.find(post => post.id === foundPost.parentId);
    if (parentPost) {
      const parentAuthor = users.find(user => user.id === parentPost.userId);
      return (
        <div className='ml-2.5'>
          <div className='flex items-center gap-2.5'>
            <a href="#">
              {parentAuthor.profile ?
                <img src={parentAuthor.profile} alt={parentAuthor.name}
                    className='rounded-full border-gray-200 bg-gray-200 object-cover object-center size-5'
                />
              : null
              }
            </a>
            <a href="#" className='flex items-center gap-[3px]' >
              <strong class="text-sm font-bold text-gray-500">{parentAuthor.name}</strong>
            </a>
            <a href="#" className='line-clamp-1 flex-1'>
              <p className='text-sm text-gray-500'>{parentPost.content}</p>
            </a> 
          </div>
          <div class="mx-[9px] my-2 h-[38px] w-0.5 bg-gray-200"></div>
        </div>
      );
    } else {
      return <p>원글을 찾을 수 없음.</p>;
    }
  };

  return (
    <div className='relative w-full'>
      <div className='flex flex-col py-7 relative'>
        {foundPost.parentId !== null && (
          <>
            {renderParentPost()}
          </>
        )}

        <Link to={`/ground/${foundGround.id}`} className='mb-4 inline-flex items-center text-sm font-bold text-gray-600'>
          👤{foundGround.title}&nbsp;>
        </Link>
        <AuthorProfile author={foundAuthor} post={foundPost} />
        <PostContent post={foundPost} postComments={postComments}/>

        {/* 답글 작성 */}
        <div>
          <h3 className='mb-4 text-lg font-bold text-gray-700'>답글 {postComments.length}</h3>

          <div className='mb-5 flex items-center gap-2'>
            <img  src={loggedInUser.profile} 
                  alt="blankProfile" 
                  className='rounded-full border-gray-200 object-cover object-center size-10'
            />
          
            <div onClick={openModal} role='button'
              className='flex h-10 flex-1 items-center truncate rounded-full px-5 text-base text-gray-400'
              style={{border: '1px solid rgb(238 238 238)'}}
            >
              {loggedInUser.name} 님의 생각을 나누며 지식을 넓혀 보세요
            </div>
          </div>
        </div>

        {/* 모달 창 */}
        {isModalOpen && (
          <Modal onClose={closeModal} user={loggedInUser} />
        )}

        {/* 댓글 및 대댓글 렌더링 */}
        {comments.map((comment) => (
          <div  key={comment.id}
                className='mb-4 pb-4'
                style={{borderBottom:'1px solid rgb(238 238 238)'}}
          >
            <PostOrCommentItem 
              post={comment} author={users.find(u => u.id === comment.userId)} 
              postComments={replies(comment.id)} replies={replies(comment.id)}
            />
            
            {/* 대댓글 렌더링 */}
            {replies(comment.id).map(reply => (
              <PostOrCommentItem 
                key={reply.id} post={reply} author={users.find(u => u.id === reply.userId)} 
                postComments={[]} replies={[]}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostDetail;
