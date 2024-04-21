import React from 'react';

export function Controls() {
  return (
    <div className="w-full flex justify-center items-center">
        <button className={`text-white rounded cursor-pointer p-2 h-full aspect-square mx-1 shadow-lg transition-all hover:shadow flex items-center justify-center bg-black/20 hover:bg-black/30`}>
          <i className={`fa-solid fa-play`}/>
        </button>
        <button className={`text-white rounded cursor-pointer p-2 h-full aspect-square mx-1 shadow-lg transition-all hover:shadow flex items-center justify-center bg-black/20 hover:bg-black/30`}>
          <i className={`fa-solid fa-pause`}/>
        </button>
    </div>
  );
}