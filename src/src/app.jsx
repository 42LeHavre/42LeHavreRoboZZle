import { useState } from 'preact/hooks'
import { Level } from './components/Level'
import { Canva } from './components/Canva'
import { Composition } from './components/Composition'
import { Toolbar } from './components/Toolbar'

export function App() {
  const [level, setLevel] = useState(1)

  return (
    <>
      <div className="w-screen flex flex-col justify-center items-center h-screen">
        <Level level={level} ></Level>
        <Canva></Canva>
        <Composition></Composition>
        <Toolbar></Toolbar>
      </div>
    </>
  )
}
