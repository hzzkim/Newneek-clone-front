import React from 'react';

const Actions = ({ post, postComments = [] }) => (
  <div className='flex justify-between gap-3'>
    <div className='relative flex items-center'>
      <button className='flex'>좋아요</button>
      <span className='ml-1 text-xs font-semibold text-gray-450'>❤️‍🔥</span>
    </div>
    <div className='flex gap-3'>
      <button className='inline-flex items-center gap-1 text-xs font-semibold text-gray-450'>💬 {postComments.length}</button>
      <button className='inline-flex items-center gap-1 text-xs font-semibold text-gray-450'>📁</button>
      <button className='inline-flex items-center gap-1 text-xs font-semibold text-gray-450'>🔗</button>
    </div>
  </div>
);

export default Actions;
