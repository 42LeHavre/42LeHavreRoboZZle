import { useState } from 'preact/hooks';
import React from 'react';

export function Tile(props) {
    const [classes, setClasses] = useState("");
    const [icon, setIcon] = useState("");
    const [func, setFunc] = useState("");

    const handleClick = () => {
        let newFunc = props.functions;
        let x = props.indexFunc;
        let y = props.indexInst;

        if (props.selected == "blue") {
            setClasses("bg-blue-500 hover:bg-blue-600");
            newFunc[x][y].color = "blue";
        } else if (props.selected == "red") {
            setClasses("bg-red-500 hover:bg-red-600");
            newFunc[x][y].color = "red";
        } else if (props.selected == "green") {
            setClasses("bg-green-500 hover:bg-green-600");
            newFunc[x][y].color = "green";
        } else if (props.selected == "gray") {
            setClasses("");
            newFunc[x][y].color = "none";
        } else if (props.selected == "up") {
            setIcon("fa-arrow-up");
            setFunc("");
            newFunc[x][y].instruction = "up";
        } else if (props.selected == "left") {
            setIcon("fa-arrow-rotate-left");
            setFunc("");
            newFunc[x][y].instruction = "left";
        } else if (props.selected == "right") {
            setIcon("fa-arrow-rotate-right");
            setFunc("");
            newFunc[x][y].instruction = "right";
        } else if (props.selected.toString().startsWith("F")) {
            setIcon("");
            setFunc(props.selected);
            newFunc[x][y].instruction = props.selected;
        } else if (props.selected == "cancel") {
            setClasses("");
            setIcon("");
            setFunc("");
            newFunc[x][y].instruction = "none";
            newFunc[x][y].color = "none";
        }

        props.setFunctions(newFunc);
    };
  
    return (
    <div className={`${classes} text-white rounded w-12 aspect-square flex items-center justify-center bg-[#3e3e3e] hover:bg-[#4a4a4a] shadow-lg hover:shadow transition-all`}
        onClick={() => handleClick()}>
            {func}
            <i className={`${icon} text-2xl fa-solid`}></i>
    </div>
  );
}
