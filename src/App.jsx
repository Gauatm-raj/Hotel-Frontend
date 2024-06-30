import { useState } from 'react'
import './App.css'
import Addroom from './components/room/Addroom'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Addroom/>
    </>
  )
}

export default App
