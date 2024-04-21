import { useState } from 'preact/hooks'
import { Level } from './components/Level'
import { Canva } from './components/Canva'
import { Composition } from './components/Composition'
import { Toolbar } from './components/Toolbar'

export function App() {

  const [functions, setFunctions] = useState([
    [
      {
        instruction: "none",
        color: "none",
      },
      {
        instruction: "none",
        color: "none",
      },
      {
        instruction: "none",
        color: "none",
      }
    ],
    [
      {
        instruction: "none",
        color: "none",
      },
      {
        instruction: "none",
        color: "none",
      },
      {
        instruction: "none",
        color: "none",
      }
    ],
    [
      {
        instruction: "none",
        color: "none",
      },
      {
        instruction: "none",
        color: "none",
      },
      {
        instruction: "none",
        color: "none",
      }
    ]
  ]);
  
  const [level, setLevel] = useState(1);
  const [selected, setSelected] = useState(1);

  console.log(functions);

  return (
    <>
      <div className="bg-[#2d2d2d] w-screen flex flex-col justify-center items-center h-screen px-2 text-gray-800">
        <Level level={level} ></Level>
        <Canva></Canva>
        <Composition functions={functions} setFunctions={setFunctions} selected={selected} setSelected={setSelected}></Composition>
        <Toolbar functions={functions} selected={selected} setSelected={setSelected}></Toolbar>
      </div>
    </>
  )
}
