import React, { useMemo, useState } from "react";
import "./App.css";

import axios from "axios";

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const App = () => {
  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setText(value); // immediate

    debouncedHandleChange(value); // delayed
  };

  const debouncedHandleChange = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedText(value);
      }, 500),
    [],
  );
  

  return (
    <div className="App">
      <input
        placeholder="Type something..."
        type="text"
        value={text}
        onChange={handleChange}
      />

      <span className="debounced-text">
        {debouncedText || "No debounced text"}
      </span>
    </div>
  );
};

export default App;
