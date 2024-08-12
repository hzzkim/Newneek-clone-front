import React from 'react';
import { useParams } from 'react-router-dom';
import GroundProfile from './GroundProfile';
import GroundPost from './GroundPost';

function GroundTest() {
  const { id } = useParams();

  return (
    <div>
      <div>
        <GroundProfile id={id} />
      </div>
      <div>
        <GroundPost id={id} />
      </div>
    </div>
  );
}

export default GroundTest;
