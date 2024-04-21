import React from 'react';
import '../index.css';
import { useEffect, useState } from 'preact/hooks';

export function Canva(props) {
    const level = ["b                  b",
                   "                    ",
                   "                    ",
                   "                    ",
                   "                    ",
                   "        bbbbb       ",
                   "       bbbbbbb      ",
                   "       bBbbbBb      ",
                   "       rbbbbbg      ",
                   "        bbbbb       ",
                   "                    ",
                   "                    ",
                   "                    ",
                   "                    ",
                   "b                  b",
  ];

  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const width = level[0].length;
    const height = level.length;
    setDimension({width, height});
  }, []);

  function getCellColor(char) {
    if (char.toLowerCase() == 'b')
        return 'from-blue-500 to-blue-600';
    else if (char.toLowerCase() == 'r')
        return 'from-red-500 to-red-600';
    else if (char.toLowerCase() == 'g')
        return 'from-lime-500 to-lime-600';
    else
        return 'dark:bg-[#3e3e3e] rounded';
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
    if (x == props.position.x && y == props.position.y)
        return `fa-rocket text-white rotate-[${getAngle(props.position.angle) + 45}deg]`
    if (char == char.toUpperCase() && char != ' ')
        return "fa-star text-yellow-500"
  }

  return (
    <div style={`grid-template-columns: repeat(${dimension.width}, 1fr); grid-template-rows: repeat(${dimension.height}, 1fr); aspect-ratio: ${dimension.width}/${dimension.height};`}
        className={`shadow-lg grid gap-0 w-full rounded overflow-hidden my-4 max-w-[500px]`}>
        {level.map((line, y) => (
            line.split("").map((cell, x) => (
                <div
                    key={`${x}-${y}`}
                    className={`${getCellColor(cell)} aspect-w-1 aspect-h-1 bg-gradient-to-br flex justify-center items-center`}
                >
                    <i className={`${getIcon(cell, x, y)} fa-solid text-white`}></i>
                </div>
            ))
        ))}
    </div>
  );
}
