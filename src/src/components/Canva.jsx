import React from 'react';
import '../index.css';

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
                   "b                  b"
  ];

  function getCellColor(char) {
    if (char.toLowerCase() == 'b')
        return 'from-blue-700 to-blue-500';
    else if (char.toLowerCase() == 'r')
        return 'from-red-700 to-red-500';
    else if (char.toLowerCase() == 'g')
        return 'from-green-700 to-green-500';
    else
        return 'bg-white';
  }

  return (
    <div className={`grid grid-template gap-0 w-full h-80 px-2`}>
        {level.map((line, rowIndex) => (
            line.substring(0, 20).split("").map((cell, cellIndex) => (
                <div
                    key={`${rowIndex}-${cellIndex}`}
                    className={`aspect-w-1 aspect-h-1 bg-gradient-to-br ${getCellColor(cell)}`}
                ></div>
            ))
        ))}
    </div>
  );
}
