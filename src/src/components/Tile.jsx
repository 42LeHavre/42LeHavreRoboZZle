import { useState } from 'preact/hooks';
import React from 'react';

export function Tile(props) {
    const [classes, setClasses] = useState("");
    const [icon, setIcon] = useState("");
    const [func, setFunc] = useState("");

    console.log(props.selected)
    const handleClick = () => {
        if (props.selected == "blue")
            setClasses("bg-blue-500 hover:bg-blue-600");
        else if (props.selected == "red")
            setClasses("bg-red-500 hover:bg-red-600");
        else if (props.selected == "green")
            setClasses("bg-green-500 hover:bg-green-600");
        else if (props.selected == "gray")
            setClasses("");
        else if (props.selected == "up") {
            setIcon("fa-arrow-up");
            setFunc("");
        } else if (props.selected == "left") {
            setIcon("fa-arrow-rotate-left");
            setFunc("");
        } else if (props.selected == "right") {
            setIcon("fa-arrow-rotate-right");
            setFunc("");
        } else if (props.selected.toString().startsWith("F")) {
            setIcon("");
            setFunc(props.selected);
        }
    };
  
    return (
    <div className={`${classes} text-white rounded w-12 aspect-square flex items-center justify-center bg-[#3e3e3e] hover:bg-[#4a4a4a] shadow-lg hover:shadow transition-all`}
        onClick={() => handleClick()}>
            {func}
            <i className={`${icon} text-2xl fa-solid`}></i>
    </div>
  );
}
