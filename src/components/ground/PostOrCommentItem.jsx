import React from 'react';
import { useNavigate } from 'react-router-dom';
import Actions from './Actions';

const PostOrCommentItem = ({ post, author, postComments, replies }) => {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/${author.id}/post/${post.id}`);
  };

  // 댓글이 있는지 여부를 확인하는 변수
  const hasComments = postComments.length > 0;

  return (
    <div className='flex py-2 gap-2 relative'>
      <a href="#">
        <img 
          src={author.profile} 
          alt={author.name} 
          className='rounded-full border-gray-200 bg-gray-200 object-cover object-center size-10'
        />
      </a>
      <div className='flex flex-1 flex-col'>
        <div className='mb-2 flex items-center justify-between gap-2'>
          <div className='flex flex-col gap-0.5'>
            <div className='text-sm font-bold text-gray-700'>{author.name}</div>
            <div className='flex items-center gap-0.5 text-xs text-gray-500'>
              며칠 전
              <span className="w-2 text-center text-2xs">•</span>
              <button className="text-primary-basic">팔로우</button>
            </div>
          </div>
        </div>
        <a href="#">
          <div className='mb-4 whitespace-pre-wrap break-all text-base text-gray-900'
            onClick={handlePostClick}
          >
            {post.content}
          </div>
        </a>
        {post.image &&
          <div className='mb-4 flex center'>
            <div className='w-full overflow-hidden rounded-lg border border-gray-100'>
              <img 
                src={post.image} 
                style={{color:'transparent',width:'100%',height:'100%'}}
              />
            </div>
          </div>
        }
        <Actions />
      </div>
      {hasComments && <div className="absolute -bottom-4 left-4 top-12 ml-px w-0.5 bg-gray-200 block"></div>}
    </div>
  );
};

export default PostOrCommentItem;
