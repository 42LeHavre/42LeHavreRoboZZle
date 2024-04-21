import React from 'react';
import '../index.css';
import { useEffect, useState } from 'preact/hooks';

export function Canva() {
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

  return (
    <div style={`grid-template-columns: repeat(${dimension.width}, 1fr); grid-template-rows: repeat(${dimension.height}, 1fr); aspect-ratio: ${dimension.width}/${dimension.height};`}
        className={`shadow-lg grid gap-0 w-full rounded overflow-hidden my-4 max-w-[500px]`}>
        {level.map((line, rowIndex) => (
            line.split("").map((cell, cellIndex) => (
                <div
                    key={`${rowIndex}-${cellIndex}`}
                    className={`aspect-w-1 aspect-h-1 bg-gradient-to-br ${getCellColor(cell)}`}
                ></div>
            ))
        ))}
    </div>
  );
}
