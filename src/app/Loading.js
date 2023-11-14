import React from 'react';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#18181b] bg-opacity-70 z-50">
      <div className="animate-spin rounded-full border-t-4 border-neutral-500  border-b-4 h-12 w-12"></div>
    </div>
  );
};

export default Loading;