import { useState, memo } from "react";
import Dialog from "./Dialog";

interface CardProps {
    text: string;
    code: string | undefined;
    inputMethod: string;
    haveImage: boolean;
}

const Card = ({text, code, inputMethod, haveImage} : CardProps) => {
    const [showDialog, setShowDialog] = useState<boolean>(false);

    document.addEventListener("mousedown", () => setShowDialog(false));

    const codeToShow = code === undefined ? "" :
                        inputMethod === "Quick" && code.length > 1 ? code.charAt(0) + code.charAt(code.length - 1) : code;

    if (codeToShow === "") {
        return (
            <div className="flex flex-col justify-center items-center rounded h-24 overflow-hidden select-none">
                <h1 className="text-3xl font-medium text-[#282828] dark:text-[#c8c8c8]">{text}</h1>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col justify-center items-center shadow-md border border-stone-300 dark:border-stone-700 shadow-stone-300/50 dark:shadow-stone-700/50 rounded h-24 overflow-hidden hover:bg-stone-100 dark:hover:bg-stone-900 cursor-pointer select-none" onClick={() => setShowDialog(true)}>
                <h1 className="text-3xl font-medium text-[#282828] dark:text-[#c8c8c8]">{text}</h1>
                <p className="mt-1 text-xs md:text-sm font-normal text-stone-600 dark:text-stone-400">{codeToShow}</p>
                {showDialog && <Dialog text={text} code={codeToShow} haveImage={haveImage} />}
            </div>
        )
    }
}

export default memo(Card);