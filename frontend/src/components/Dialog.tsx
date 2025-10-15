import { useRef } from "react";

interface DialogProps {
    text: string;
    code: string;
    haveImage: boolean;
}

const Dialog = ({text, code, haveImage} : DialogProps) => {
    const textImageRef = useRef<any>(null);

    const showCodeWithColor = () => {
        return (
            <p className="mt-10 text-3xl font-normal text-stone-600 dark:text-stone-400">
                {code.split("").map((char, index) => {
                    switch (index) {
                        case 0:
                            return <span className="text-[#ff0000]" key={`${index}-red-text`}>{char}</span>;
                        case code.length - 1:
                            return <span className="text-[#ff00ff]" key={`${index}-magenta-text`}>{char}</span>;
                        case 1:
                            return <span className="text-[#ffa500]" key={`${index}-orange-text`}>{char}</span>;
                        case 2:
                            return <span className="text-[#ffff00]" key={`${index}-yellow-text`}>{char}</span>;
                        case 3:
                            return <span className="text-[#00ff00]" key={`${index}-green-text`}>{char}</span>;
                        default:
                            return char;
                    }
                })}
            </p>
        );
    }

    return (
        <div className="relative z-10">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <div className="flex flex-col justify-center items-center rounded overflow-hidden bg-white dark:bg-[#1e1e1e] px-20 py-20 w-[310px] h-[370px]">    
                        <div ref={textImageRef} className="text-9xl font-semibold text-[#282828] dark:text-[#c8c8c8]">{text}</div>
                        {!haveImage && <p className="mt-10 text-3xl font-normal text-stone-600 dark:text-stone-400">{code}</p>}
                        {haveImage && showCodeWithColor()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dialog;