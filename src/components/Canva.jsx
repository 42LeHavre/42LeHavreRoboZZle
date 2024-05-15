import React from 'react';
import '../index.css';
import { useEffect, useState } from 'preact/hooks';

const THEME = true;

export function Canva(props) {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (props.data.map.length) {
        const width = props.data.map[0].length;
        const height = props.data.map.length;
        setDimension({width, height});
    }
  }, [props.data.map]);

  function getCellColor(char) {
    if (char.toLowerCase() == 'b')
        return 'from-blue-500 to-blue-600';
    else if (char.toLowerCase() == 'r')
        return 'from-red-500 to-red-600';
    else if (char.toLowerCase() == 'g')
        return 'from-lime-500 to-lime-600';
    else
        return THEME ? "dark:bg-[#3e3e3e] rounded" :  "tile";
  }

  function getAngle(angle) {
    if (angle == "right")
        return 0;
    else if (angle == "left")
        return 180;
    else if (angle == "down")
        return 90;
    else if (angle == "up")
        return 270;
  }

  function getIcon(char, x, y) {
    if (x == props.data.x && y == props.data.y)
        return THEME ? `fa-rocket rotate-[${getAngle(props.data.dir) + 45}deg]` : `player-${getAngle(props.data.dir)}`
    if (char == char.toUpperCase() && char != ' ')
        return THEME ? "fa-star text-yellow-500" : "collectible"
  }

  return (
    <div style={`grid-template-columns: repeat(${dimension.width}, 1fr); grid-template-rows: repeat(${dimension.height}, 1fr); aspect-ratio: ${dimension.width}/${dimension.height};`}
        className={`overflow-y-auto shadow-lg grid gap-0 w-full rounded my-4 max-w-[500px]`}>
        {props.data.map.map((line, y) => (
            line.split("").map((cell, x) => (
                <div
                    key={`${x}-${y}`}
                    className={`${getCellColor(cell)} aspect-w-1 aspect-h-1 bg-gradient-to-br flex justify-center items-center`}
                >
                    <i className={`${getIcon(cell, x, y)} fa-solid flex items-center justify-center text-xl w-4/5 h-4/5 text-white`}></i>
                </div>
            ))
        ))}
    </div>
  );
}
