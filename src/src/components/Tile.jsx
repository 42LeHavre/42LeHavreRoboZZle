import { useEffect, useState } from 'preact/hooks';
import React from 'react';

export function Tile(props) {
    const [classes, setClasses] = useState("");
    const [icon, setIcon] = useState("");
    const [func, setFunc] = useState("");

    const handleClick = () => {
        let newInst = props.instance;
        let x = props.indexFunc;
        let y = props.indexInst;

        if (props.selected == "blue") {
            setClasses("bg-blue-500 hover:bg-blue-600");
            newInst.instructions[x][y].color = "blue";
        } else if (props.selected == "red") {
            setClasses("bg-red-500 hover:bg-red-600");
            newInst.instructions[x][y].color = "red";
        } else if (props.selected == "green") {
            setClasses("bg-green-500 hover:bg-green-600");
            newInst.instructions[x][y].color = "green";
        } else if (props.selected == "gray") {
            setClasses("");
            newInst.instructions[x][y].color = null;
        } else if (props.selected == "forward") {
            setIcon("fa-arrow-up");
            setFunc("");
            newInst.instructions[x][y].movement = "forward";
        } else if (props.selected == "left") {
            setIcon("fa-arrow-rotate-left");
            setFunc("");
            newInst.instructions[x][y].movement = "left";
        } else if (props.selected == "right") {
            setIcon("fa-arrow-rotate-right");
            setFunc("");
            newInst.instructions[x][y].movement = "right";
        } else if (props.selected.startsWith("F")) {
            setIcon("");
            setFunc(props.selected);
            newInst.instructions[x][y].movement = Number(props.selected.split('F')[1]) - 1;
        } else if (props.selected == "cancel") {
            setClasses("");
            setIcon("");
            setFunc("");
            newInst.instructions[x][y].movement = null;
            newInst.instructions[x][y].color = null;
        }

        props.setInstance(newInst);
    };

    useEffect(() => {
        setClasses("");
        setIcon("");
        setFunc("");
    }, [props.level])

    useEffect(() => {
        if (props.currentInst.x == props.indexFunc && props.currentInst.y == props.indexInst)
            setClasses(classes + " border-2 border-white");
        else
            setClasses(classes.split(" border-2 border-white").join(''));
    }, [props.currentInst])
  
    return (
    <div className={`${classes} text-white cursor-pointer rounded w-12 aspect-square flex items-center justify-center bg-[#3e3e3e] hover:bg-[#4a4a4a] shadow-lg hover:shadow transition-all`}
        onClick={() => handleClick()}>
            {func}
            <i className={`${icon} text-2xl fa-solid`}></i>
    </div>
  );
}
