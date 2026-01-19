import { useState } from 'preact/hooks';
import React from 'react';
import { Tile } from './Tile';

export function Composition(props) {
  return (
    <div className="flex-1 w-full flex flex-col items-start overflow-y-auto overflow-x-auto min-h-300 max-w-[500px]">
      <div className="flex flex-col items-start">
        {
          props.instance.instructions.length ?
          props.instance.instructions.map((func, indexFunc) => (
            <div style={`grid-template-columns: repeat(${func.length + 1}, 1fr);`} className="grid my-2 rounded gap-1 font-semibold text-xl select-none">
              <div className="bg-blue-500 text-white rounded w-12 aspect-square flex items-center justify-center shadow-lg">F{indexFunc + 1}</div>
              {func.map((inst, indexInst) => (
                <Tile play={props.play} currentInst={props.currentInst} selected={props.selected} instance={props.instance} setInstance={props.setInstance} indexFunc={indexFunc} indexInst={indexInst} level={props.level}/>
              ))}
            </div>
          )) : null
        }
      </div>
    </div>
  );
}
