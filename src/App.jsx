import React from 'react'
import { useEffect, useState,  useCallback ,useRef} from 'react';

const App = () => {
  const [length,setLength] = useState(8)
  const [number,setNumber] = useState(false);
  const [char,setChar] = useState(false);
  const [password,setPassword] = useState("")
  //useRef hook
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
if(number) {
   str +="0123456789"
}
if(char) {
   str +="@#%^&*()-+"
}
for(let i = 1; i<= length; i++) {
  let char =  Math.floor(Math.random() * str.length + 1)
  pass += str.charAt(char)
}
setPassword(pass)
  },[length, number ,char, setPassword])
   const copytoclipboard = useCallback(()=> {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20);
window.navigator.clipboard.writeText(password)
   },[password])
  useEffect(() =>{
    passwordGenerator()
  },[length,number,char,passwordGenerator])
  
  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4  py-3 my-8 text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center my-3'>Password generator</h1>
<div className='flex shadow rounded-lg overflow-hidden mb-4'>
  <input type="text"
  value={password}
  className='outline-none w-full py-1 px-3'
  placeholder="password"
  ref={passwordRef}
  readonly/>
  <button  onClick={copytoclipboard} className='bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
</div>
<div className="flex text-sm gap-x-3">
  <div className='flex-item-center gap-x-2'>
    <input type="range"
    min={8}
    max={50}
    value={length}
    className='cursor-pointer'
    onChange={(e) => {setLength(e.target.value)}}
    />
    <label>Length: {length}</label>
  </div>
  <div className='flex items-center gap-x-1'>
<input 
 type="checkbox"
defaultChecked={number}
id="numberInput"
onChange={() => {
setNumber((prev) =>!prev);
}} />
 <label>Number {number}</label>
  </div>
  <div className='flex items-center gap-x-1'>
<input className='flex'
 type="checkbox"
defaultChecked={number}
id="numberInput"
onChange={() => {
setChar((prev) =>!prev);
}} />
 <label>Character {char}</label>
  </div>
</div>
    </div>
  )
}

export default App
