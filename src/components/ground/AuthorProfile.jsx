import React from 'react';
import { formatDate } from '../../format';

const AuthorProfile = ({ author, post }) => {
  return (
    <div className='mb-3 flex items-center gap-2'>
      <a>
        <img 
          src={author.profile} 
          alt={author.name} 
          className='rounded-full border-gray-200 bg-gray-200 object-cover object-center size-10'
        />
      </a>
      <div className='flex flex-col'>
        <a className='flex items-center gap-2'>
          <div className='flex items-center gap-[3px]'>
            <span className='text-sm font-bold text-gray-700'>{author.name}</span>
          </div>
        </a>
        <p className='flex items-center gap-0.5 text-xs text-gray-500'>
          {formatDate(post.date)}
          <span class="w-2 text-center text-2xs">•</span>
          <button class="text-primary-basic">팔로우</button>
        </p>
      </div>
    </div>
  );
};

export default AuthorProfile;
