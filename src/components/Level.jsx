import React from 'react';

export function Level(props) {
  return (
    <div className="text-2xl text-white cursor-pointer font-semibold w-full flex justify-center mt-2"
	  	 onClick={() => {props.setLevel(1)}}>
      Level - {props.level}
    </div>
  );
}
