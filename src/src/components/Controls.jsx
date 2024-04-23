import React from 'react';

export function Controls(props) {

  async function handleClick() {
    props.setPlay(!props.play);
    console.log("here", props.play)
  }
  return (
    <div className="w-full my-2 flex justify-evenly px-4 items-center">
        <button onClick={() => handleClick()} className={`text-white rounded cursor-pointer py-3 px-4 w-20 shadow-lg transition-all hover:shadow flex items-center justify-center bg-black/20 hover:bg-black/30`}>
          <i className={`fa-solid ${props.play ? "fa-pause" : "fa-play"}`}/>
        </button>
        <input id="default-range" type="range" value="50" className="w-1/2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"></input>
    </div>
  );
}