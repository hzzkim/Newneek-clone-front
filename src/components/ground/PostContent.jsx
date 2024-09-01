import React from 'react';
import Action from './Actions'

const PostContent = ({ post, postComments=[] }) => {
  return (
    <div className='mb-6 flex flex-1 flex-col border-b border-gray-100 pb-6'>
      <div className='mb-4 whitespace-pre-wrap break-all text-base text-gray-900'>
        {post.content}
      </div>
      {post.image && 
        <div className='mb-4 flex center'>
          <div className='w-full overflow-hidden rounded-lg border border-gray-100'>
            <img src={post.image} alt={post.content} style={{color:'transparent', width:'100%'}} />
          </div>
        </div>
      }
      
      <Action post={post} postComments={postComments}/>
  </div>
  );
};

export default PostContent;
