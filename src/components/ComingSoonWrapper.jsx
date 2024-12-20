import React from 'react';
import { Icon } from '@iconify/react';

const ComingSoonWrapper = ({ children }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <Icon icon="svg-spinners:blocks-shuffle-3" className="text-[64px] text-white block" /> 
        <div className='absolute mt-28 animate-pulse'>
        
        <p>Coming Soon</p>
        </div>
      </div>
      <div className="filter blur-3xl">
        {children}
      </div>
    </div>
  );
};

export default ComingSoonWrapper;
