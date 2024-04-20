import { useState } from 'preact/hooks'

export function App() {
  const [level, setLevel] = useState(1)

  return (
    <>
      <div>
        <h1>Level {level}</h1>
      </div>
    </>
  )
}
