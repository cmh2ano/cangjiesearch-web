import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './App.css';
import logo from './assets/cangjie.svg';
import light from './assets/light.svg';
import dark from './assets/dark.svg';
import Card from './components/Card';
import jsonData from "./assets/data.json";
import imageJsonData from "./assets/imageChar.json";

function App() {
  const [input, setInput] = useState<string>("");
  const [inputMethod, setInputMethod] = useState<string>("Cangjie");
  const [theme, setTheme] = useState<string>("light");
  const [data, setData] = useState<any>(null);
  const [imageData, setImageData] = useState<any>(null);

  const scrollRef = useRef<any>(null);

  const toggleTheme = () => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
    );
  }

  const changeTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
    toggleTheme();
  }

  const changeInputMethod = (inputMethod: string) => {
    setInputMethod(inputMethod);
    localStorage.setItem("inputMethod", inputMethod);
  }

  useEffect(() => {
    const data = JSON.parse(JSON.stringify(jsonData));
    setData(data);
    const imageData = JSON.parse(JSON.stringify(imageJsonData));
    setImageData(imageData);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [input]);

  useLayoutEffect(() => {
    toggleTheme();
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    if (localStorage.inputMethod === "Cangjie" || localStorage.inputMethod === "Quick") {
      setInputMethod(localStorage.inputMethod);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col items-center p-5 sm:p-10 h-screen">
        <div className="flex flex-col items-center my-5">
          <img className="w-24" src={logo} alt="Cangjie logo" />
          <h1 className="text text-2xl sm:text-5xl text-[#282828] dark:text-[#c8c8c8]">倉頡速成字典</h1>
        </div>
        <div className="flex place-content-between sm:place-content-end items-center w-19/20 sm:w-3/5 my-1">
          <div className="mx-1">
            {theme === "dark" && <img src={light} alt="Mode" className="cursor-pointer" onClick={() => changeTheme("light")}/>}
            {theme === "light" && <img src={dark} alt="Mode" className="cursor-pointer" onClick={() => changeTheme("dark")}/>}
          </div>
          <div className="mx-1">
            {inputMethod === "Cangjie" && <button type="button" className="px-3 text text-lg text-[#282828] dark:text-[#c8c8c8] bg-white dark:bg-[#1e1e1e] border-2 border-[#40bcff] rounded-l-sm cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-900" onClick={() => changeInputMethod("Cangjie")}>倉頡</button>}
            {inputMethod === "Quick" && <button type="button" className="px-3 text text-lg text-[#282828] dark:text-[#c8c8c8] bg-white dark:bg-[#1e1e1e] border-y border-l border-stone-300 dark:border-stone-700 rounded-l-sm cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-900" onClick={() => changeInputMethod("Cangjie")}>倉頡</button>}
            {inputMethod === "Cangjie" && <button type="button" className="px-3 text text-lg text-[#282828] dark:text-[#c8c8c8] bg-white dark:bg-[#1e1e1e] border-y border-r border-stone-300 dark:border-stone-700 rounded-r-sm cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-900" onClick={() => changeInputMethod("Quick")}>速成</button>}
            {inputMethod === "Quick" && <button type="button" className="px-3 text text-lg text-[#282828] dark:text-[#c8c8c8] bg-white dark:bg-[#1e1e1e] border-2 border-[#40bcff] rounded-r-sm cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-900" onClick={() => changeInputMethod("Quick")}>速成</button>}
          </div>
        </div>
        <textarea id="input" rows={2} className="p-2.5 min-h-[78px] text-xl text-[#282828] dark:text-[#c8c8c8] bg-white dark:bg-[#1e1e1e] resize-none border border-stone-300 dark:border-stone-700 focus:outline-none focus:border-[#40bcff] rounded-sm dark:text-[#c8c8c8] w-19/20 sm:w-3/5 my-1" placeholder="查倉頡/速成碼" value={input} onChange={e => setInput(e.target.value)}></textarea>
        <div ref={scrollRef} className="bg-white dark:bg-[#1e1e1e] flex flex-grow border border-stone-300 dark:border-stone-700 rounded-sm w-19/20 sm:w-3/5 min-h-[120px] my-1 overflow-y-auto">
          <div className="m-3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-9 gap-3 h-fit w-full">
            {Array.from(input).map((text, index) => 
              data !== null ? <Card text={text} code={data[text]} inputMethod={inputMethod} haveImage={imageData !== null && imageData.includes(text)} key={`${text}-${index}`} />
                : <Card text={text} code="" inputMethod={inputMethod} haveImage={imageData !== null && imageData.includes(text)} key={`${text}-${index}`} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
