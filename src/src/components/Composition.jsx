import { useState } from 'preact/hooks';
import React from 'react';

export function Composition() {

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
      },
      {
        instruction: "F1",
        color: "green"
      },
      
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
    ],
  ];


  const [selected, setSelected] = useState(null);

  const handleClick = (keyFun, keyInstr) => {
    setSelected({keyFun, keyInstr});
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="flex flex-col items-start">
        {functions.map((fun, keyFun) => (
          <div style={`grid-template-columns: repeat(${fun.length + 1}, 1fr);`} className="grid my-2 rounded gap-1 font-semibold text-xl">
            <div className="bg-blue-500 text-white rounded w-12 aspect-square flex items-center justify-center shadow-lg">F{keyFun + 1}</div>
            {fun.map((instr, keyInstr) => (
              <div className={`${selected && selected.keyFun === keyFun && selected.keyInstr === keyInstr ? "border-2 border-white" : ""}
                rounded w-12 aspect-square flex items-center justify-center bg-[#3e3e3e] hover:bg-[#4a4a4a] shadow-lg hover:shadow transition-all`}
                onClick={() => handleClick(keyFun, keyInstr)}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
