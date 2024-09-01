import React from 'react';
import { useNavigate } from 'react-router-dom';
import ground from '../../ground';

function GroundList() {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/ground/${id}`);
  }

  return (
    <div>
      <div>
        <h2 className='mb-1.5 text-lg font-bold text-gray-900 md:text-xl'>전체 그라운드</h2>
        <p className={`text-sm text-gray-600 md:text-base`}>
          관심있는 주제의 그라운드에 참여하고, 뉴니커와 함께 지식을 나눠요
        </p>
        {ground.map((ground) => (
          <div
            key={ground.id}
            className={`flex gap-5 p-4 items-center rounded-xl mb-2`}
            style={{border: '1px solid #eee'}}
            onClick={()=>handleClick(ground.id)}
          >
          
            <img src={ground.img} alt={ground.title} 
              className='size-[72px] rounded-lg border border-gray-100 bg-gray-200 object-cover object-center'
            />
            <div className='content'>
              <h3>{ground.title}</h3>
              <p className='line-clamp-2 break-all'>{ground.content}</p>
              <span className='text-xs'>
                👤 {ground.member}명
                <span className='tag'>{ground.category}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroundList;