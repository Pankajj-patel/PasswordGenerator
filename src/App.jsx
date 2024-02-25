import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [spcialCharAllowed, setspcialCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (spcialCharAllowed) str += "!@#$%^&*-";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, spcialCharAllowed, setPassword]);

  function copyData() {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password);
  }

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, spcialCharAllowed, passwordGenerator]);

  return (
    <>
      <div>
        <h1 className="text-4xl text-center text-white">Password Generator</h1>
        <div>
          <input
            type="text"
            value={Password}
            ref={passwordRef}
            className="outline-none display"
            placeholder="Password"
            readOnly
          />
          <button onClick={copyData}>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-1">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className=" text-white">Length :{length}</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label className=" text-white">NumberAllowed</label>
          </div>

          <div>
            <input
              type="checkbox"
              defaultChecked={spcialCharAllowed}
              id="specialCharInput"
              onChange={() => {
                setspcialCharAllowed((prev) => !prev);
              }}
            />
            <label className=" text-white">SpecialCharAllowed</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
