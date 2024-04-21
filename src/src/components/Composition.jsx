import { useState } from 'preact/hooks';
import React from 'react';
import { Tile } from './Tile';

export function Composition(props) {

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

  return (
    <div className="flex-1 w-full flex flex-col items-center md:overflow-hidden overflow-y-scroll">
      <div className="flex flex-col items-start">
        {functions.map((fun, keyFun) => (
          <div style={`grid-template-columns: repeat(${fun.length + 1}, 1fr);`} className="grid my-2 rounded gap-1 font-semibold text-xl">
            <div className="bg-blue-500 text-white rounded w-12 aspect-square flex items-center justify-center shadow-lg">F{keyFun + 1}</div>
            {fun.map((instr, keyInstr) => (
              <Tile selected={props.selected}/>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
