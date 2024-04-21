import { useState } from 'preact/hooks';
import React from 'react';
import { Tile } from './Tile';

export function Composition(props) {

  return (
    <div className="flex-1 w-full flex flex-col items-center overflow-y-auto">
      <div className="flex flex-col items-start">
        {props.functions.map((func, indexFunc) => (
          <div style={`grid-template-columns: repeat(${func.length + 1}, 1fr);`} className="grid my-2 rounded gap-1 font-semibold text-xl">
            <div className="bg-blue-500 text-white rounded w-12 aspect-square flex items-center justify-center shadow-lg">F{indexFunc + 1}</div>
            {func.map((inst, indexInst) => (
              <Tile selected={props.selected} functions={props.functions} setFunctions={props.setFunctions} indexFunc={indexFunc} indexInst={indexInst}/>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
