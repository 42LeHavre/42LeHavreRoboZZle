  import React from 'react';

  export function Controls(props) {

    async function handleChange(event) {
      let newValue = parseInt(event.target.value);
      props.setDeltaTime(newValue);
    }

    async function handleClick() {
      props.setPlay(!props.play);
    }

    return (  
      <div className="w-full my-2 flex justify-evenly px-4 items-center max-w-[500px]">
          <button onClick={() => handleClick()} className={`text-white rounded cursor-pointer py-3 px-4 w-20 shadow-lg transition-all hover:shadow flex items-center justify-center bg-black/20 hover:bg-black/30`}>
            <i className={`fa-solid ${props.play ? "fa-pause" : "fa-play"}`}/>
          </button>
          <input id="default-range" type="range" value={props.deltaTime} min={50} max={4000} onChange={handleChange} style={{direction: 'rtl'}} className="w-1/2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"></input>
      </div>
    );
  }
