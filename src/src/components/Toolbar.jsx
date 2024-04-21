import { useState } from 'preact/hooks';
import React from 'react';

export function Toolbar(props) {

  const handleClick = (str) => {
    props.setSelected(str);
  };

  return (
    <div className="w-full max-w-[500px] h-28 text-white text-2xl flex flex-col items-center justify-center bg-[#3e3e3e] rounded-lg py-2 mb-2 shadow-lg overflow-y-auto">
      <div className="h-1/2 flex items-center justify-center mb-2">
        <div className={`rounded cursor-pointer h-full aspect-square mx-1 shadow-lg transition-all hover:shadow flex items-center justify-center bg-black/20 hover:bg-black/30 ${props.selected === 'forward' ? "border-2 border-white" : ""}`} onClick={() => handleClick('forward')}>
          <i className={`fa-solid fa-arrow-up`}/>
        </div>
        <div className={`rounded cursor-pointer h-full aspect-square mx-1 shadow-lg transition-all hover:shadow flex items-center justify-center bg-black/20 hover:bg-black/30 ${props.selected === 'left' ? "border-2 border-white" : ""}`} onClick={() => handleClick('left')}>
          <i className={`fa-solid fa-arrow-rotate-left`}/>
        </div>
        <div className={`rounded cursor-pointer h-full aspect-square mx-1 shadow-lg transition-all hover:shadow flex items-center justify-center bg-black/20 hover:bg-black/30 ${props.selected === 'right' ? "border-2 border-white" : ""}`} onClick={() => handleClick('right')}>
          <i className={`fa-solid fa-arrow-rotate-right`}/>
        </div>

        <div className={`rounded cursor-pointer h-full aspect-square mx-1 shadow-lg transition-all hover:shadow bg-blue-500 hover:bg-blue-600 ${props.selected === 'blue' ? "border-2 border-white" : ""}`} onClick={() => handleClick('blue')}></div>
        <div className={`rounded cursor-pointer h-full aspect-square mx-1 shadow-lg transition-all hover:shadow bg-red-500 hover:bg-red-600 ${props.selected === 'red' ? "border-2 border-white" : ""}`} onClick={() => handleClick('red')}></div>
        <div className={`rounded cursor-pointer h-full aspect-square mx-1 shadow-lg transition-all hover:shadow bg-green-500 hover:bg-green-600 ${props.selected === 'green' ? "border-2 border-white" : ""}`} onClick={() => handleClick('green')}></div>
        <div className={`rounded cursor-pointer h-full aspect-square mx-1 shadow-lg transition-all hover:shadow bg-black/20 hover:bg-black/30 ${props.selected === 'gray' ? "border-2 border-white" : ""}`} onClick={() => handleClick('gray')}></div>
      </div>
        <div class="h-1/2 flex items-center justify-center flex-wrap w-full">
          <div className={`mb-2 rounded cursor-pointer h-full aspect-square mx-1 shadow-lg transition-all hover:shadow flex items-center justify-center bg-black/20 hover:bg-black/30 ${props.selected === 'cancel' ? "border-2 border-white" : ""}`} onClick={() => handleClick('cancel')}>
            <i className={`text-red-500 fa-solid fa-xmark`}/>
          </div>
          {props.functions.length ?  props.functions.map((inst, index) => (
            <div className={`mb-2 rounded cursor-pointer h-full aspect-square shadow-lg transition-all hover:shadow mx-1 bg-black/20 hover:bg-black/30 flex justify-center items-center font-semibold text-xl ${props.selected === 'F' + (index + 1) ? "border-2 border-white" : ""}`} onClick={() => handleClick('F' + (index + 1))}>F{index + 1}</div>
          )) : null}
        </div>
    </div>
  );
}
