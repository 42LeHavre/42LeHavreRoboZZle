import React from 'react';

export function Level(props) {
  return (
    <div className="text-2xl text-white font-semibold w-full flex justify-center mt-2">
      Level - {props.level}
    </div>
  );
}
