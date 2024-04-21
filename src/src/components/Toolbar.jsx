import { useState } from 'preact/hooks';
import React from 'react';

export function Toolbar(props) {

  const handleClick = (str) => {
    props.setSelected(str);
  };

  const functions = [
    [
      {
        instruction: "forward",
        color: null
      },
      {
        instruction: "left",
        color: "red"
      },
      {
        instruction: "right",
        color: "blue"
      },
      {
        instruction: "F1",
        color: "green"
      }
    ],
    [
      {
        instruction: "forward",
        color: null
      },
      {
        instruction: "left",
        color: "red"
      },
      {
        instruction: "right",
        color: "blue"
      },
      {
        instruction: "F1",
        color: "green"
      }
    ],
    [
      {
        instruction: "forward",
        color: null
      },
      {
        instruction: "left",
        color: "red"
      },
      {
        instruction: "right",
        color: "blue"
      },
      {
        instruction: "F1",
        color: "green"
      }
    ],
  ];

  return (
    <div className="w-full h-28 text-white flex flex-col items-center justify-center bg-[#3e3e3e] rounded-lg py-2 mb-2">
      <div className="h-1/2 flex items-center justify-center mb-2">
        <div className={`rounded h-full aspect-square mx-1 shadow-lg transition-all hover:shadow flex items-center justify-center bg-black/20 hover:bg-black/30 ${props.selected === 'up' ? "border-2 border-white" : ""}`} onClick={() => handleClick('up')}>
          <i className={`text-2xl fa-solid fa-arrow-up`}/>
        </div>
        <div className={`rounded h-full aspect-square mx-1 shadow-lg transition-all hover:shadow flex items-center justify-center bg-black/20 hover:bg-black/30 ${props.selected === 'left' ? "border-2 border-white" : ""}`} onClick={() => handleClick('left')}>
          <i className={`text-2xl fa-solid fa-arrow-rotate-left`}/>
        </div>
        <div className={`rounded h-full aspect-square mx-1 shadow-lg transition-all hover:shadow flex items-center justify-center bg-black/20 hover:bg-black/30 ${props.selected === 'right' ? "border-2 border-white" : ""}`} onClick={() => handleClick('right')}>
          <i className={`text-2xl fa-solid fa-arrow-rotate-right`}/>
        </div>

        <div className={`rounded h-full aspect-square mx-1 shadow-lg transition-all hover:shadow bg-blue-500 hover:bg-blue-600 ${props.selected === 'blue' ? "border-2 border-white" : ""}`} onClick={() => handleClick('blue')}></div>
        <div className={`rounded h-full aspect-square mx-1 shadow-lg transition-all hover:shadow bg-red-500 hover:bg-red-600 ${props.selected === 'red' ? "border-2 border-white" : ""}`} onClick={() => handleClick('red')}></div>
        <div className={`rounded h-full aspect-square mx-1 shadow-lg transition-all hover:shadow bg-green-500 hover:bg-green-600 ${props.selected === 'green' ? "border-2 border-white" : ""}`} onClick={() => handleClick('green')}></div>
        <div className={`rounded h-full aspect-square mx-1 shadow-lg transition-all hover:shadow bg-black/20 hover:bg-black/30 ${props.selected === 'gray' ? "border-2 border-white" : ""}`} onClick={() => handleClick('gray')}></div>
      </div>
        <div class="h-1/2 flex items-center justify-center flex-wrap w-full">
          {functions.map((inst, index) => (
            <div className={`rounded h-full aspect-square shadow-lg transition-all hover:shadow mx-1 bg-black/20 hover:bg-black/30 flex justify-center items-center font-semibold text-xl ${props.selected === 'F' + (index + 1) ? "border-2 border-white" : ""}`} onClick={() => handleClick('F' + (index + 1))}>F{index + 1}</div>
          ))}
        </div>
    </div>
  );
}
