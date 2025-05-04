import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Copy from "../assets/Copy.svg";



function ShareWindow(props: {url:string})
{
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(props.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return(
        <>
            <div className="rounded-xl items-center h-[10%] bg-[#373737] m-2 p-3 pt-0">
                <p className="text-white">Link</p>
                <div className="flex items-center">
                    <p
                        className="truncate rounded-lg p-3 text-white bg-[#696969] w-full mr-2"
                        title={props.url}
                    >
                        {props.url}
                    </p>
                    <div className="flex flex-col items-end justify-end mt-2 gap-4 relative">
                        <img src={Copy} alt="Copy icon" className="w-4 h-4 cursor-pointer" onClick={handleCopy} />
                        {copied && (
                            <span className="absolute -top-6 right-0 bg-black text-white text-xs rounded px-2 py-1 shadow-lg z-50">
                                Copied!
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </>
    )   
}

export default ShareWindow;