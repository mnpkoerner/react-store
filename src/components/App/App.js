import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css';

function App() {

  const [serverCheck, setServerCheck] = useState('no response')

  console.log(serverCheck)

  const serverSender = () => {
    axios.get('/shell').then((response)=>{
      console.log(response)
      setServerCheck('have it')
    }).catch((error)=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    serverSender()
  }, [])

  return (
    <div className="App">
      <h1>react</h1>
    </div>
  );
}

export default App;
