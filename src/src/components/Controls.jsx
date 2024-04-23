import React from 'react';

export function Controls(props) {

  async function handleClick() {
    props.setPlay(!props.play);
    console.log("here", props.play)
  }
  return (
    <div className="w-full mb-2 flex justify-center items-center">
        <button onClick={() => handleClick()} className={`text-white rounded cursor-pointer py-3 px-4 w-20 shadow-lg transition-all hover:shadow flex items-center justify-center bg-black/20 hover:bg-black/30`}>
          <i className={`fa-solid ${props.play ? "fa-pause" : "fa-play"}`}/>
        </button>
    </div>
  );
}