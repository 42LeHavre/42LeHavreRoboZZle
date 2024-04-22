import React from 'react';

export function PopUp({ active, setActive, button, actionButton, game, children }) {
  const handleClick = () => {
    actionButton(game);
    setActive(false);
  }
  
  return (
    <div className={`${active ? null : "hidden"} w-screen h-screen absolute bg-black/60 top-0 left-0 z-50 flex justify-center items-center`}>
      <div className='text-white px-6 py-6 flex flex-col items-center bg-[#2d2d2d] bg-opacity-70 backdrop-blur-2xl rounded'>
          <p className="text-lg">{children}</p>
        <button onClick={() => {handleClick()}} className="mt-2 px-8 py-3 shadow-lg hover:shadow font-semibold bg-white rounded text-black hover:bg-gray-200">{button}</button>
      </div>
    </div>
  );
}
