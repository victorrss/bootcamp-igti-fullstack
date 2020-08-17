import React, { useState, useEffect } from 'react';
import { getNewTimestamp } from './helpers/dateTimeHelpers'

export default function App() {
  const [clickArray, setClickArray] = useState([])

  useEffect(() => {
    document.title = clickArray.length
  })

  const handleClick = () => {
    const newClickArray = Object.assign([], clickArray)
    newClickArray.push(getNewTimestamp())
    setClickArray(newClickArray)
  }

  return (
    <div>
      <h3>React com <em>Hooks</em></h3>
      <button onClick={handleClick}>Clique aqui</button>
      <ul>
        {clickArray.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}