import React from 'react';

export function Level(props) {
  return (
    <div className="text-2xl text-white font-semibold w-full flex justify-center">
      Level - {props.level}
    </div>
  );
}
