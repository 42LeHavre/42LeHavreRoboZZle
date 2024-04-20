import { useState } from 'preact/hooks';
import React from 'react';

export function Toolbar() {
  const [selected, setSelected] = useState(0)

  const handleClick = (num) => {
    setSelected(num);
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
        <div className={`rounded h-full aspect-square mx-1 shadow-lg transition-all hover:shadow flex items-center justify-center bg-black/20 hover:bg-black/30 ${selected === 1 ? "border-2 border-white" : ""}`} onClick={() => handleClick(1)}>
          <i className={`text-2xl fa-solid fa-arrow-up`}/>
        </div>
        <div className={`rounded h-full aspect-square mx-1 shadow-lg transition-all hover:shadow flex items-center justify-center bg-black/20 hover:bg-black/30 ${selected === 2 ? "border-2 border-white" : ""}`} onClick={() => handleClick(2)}>
          <i className={`text-2xl fa-solid fa-arrow-rotate-left`}/>
        </div>
        <div className={`rounded h-full aspect-square mx-1 shadow-lg transition-all hover:shadow flex items-center justify-center bg-black/20 hover:bg-black/30 ${selected === 3 ? "border-2 border-white" : ""}`} onClick={() => handleClick(3)}>
          <i className={`text-2xl fa-solid fa-arrow-rotate-right`}/>
        </div>

        <div className={`rounded h-full aspect-square mx-1 shadow-lg transition-all hover:shadow bg-blue-500 hover:bg-blue-600 ${selected === 4 ? "border-2 border-white" : ""}`} onClick={() => handleClick(4)}></div>
        <div className={`rounded h-full aspect-square mx-1 shadow-lg transition-all hover:shadow bg-red-500 hover:bg-red-600 ${selected === 5 ? "border-2 border-white" : ""}`} onClick={() => handleClick(5)}></div>
        <div className={`rounded h-full aspect-square mx-1 shadow-lg transition-all hover:shadow bg-green-500 hover:bg-green-600 ${selected === 6 ? "border-2 border-white" : ""}`} onClick={() => handleClick(6)}></div>
      </div>
        <div class="h-1/2 flex items-center justify-center">
          {functions.map((inst, index) => (
            <div className={`rounded h-full aspect-square shadow-lg transition-all hover:shadow mx-1 bg-black/20 hover:bg-black/30 flex justify-center items-center font-semibold text-xl ${selected === index + 8 ? "border-2 border-white" : ""}`} onClick={() => handleClick(index + 8)}>F{index + 1}</div>
          ))}
        </div>
    </div>
  );
}
