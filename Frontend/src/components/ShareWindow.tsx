import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function ShareWindow(props: {url:string})
{
    return(
        <>
            <div className="rounded-xl items-center h-[10%] bg-[#373737] m-2 p-3 pt-0">
                <p className="text-white">Link</p>
                <p className="overflow-wrap-break-word rounded-lg p-3 color-white bg-[#696969]" >{props.url}</p>
            </div>
        </>
    )   
}

export default ShareWindow;