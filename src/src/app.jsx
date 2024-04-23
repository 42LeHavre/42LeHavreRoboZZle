import { useState } from 'preact/hooks'
import { Level } from './components/Level'
import { Controls } from './components/Controls'
import { Canva } from './components/Canva'
import { Composition } from './components/Composition'
import { Toolbar } from './components/Toolbar'
import { useEffect } from 'preact/hooks'
import { PopUp } from './components/PopUp'

import { deltaTime, sleep, getData, countCollectible, verifColor, collectCollectible, changeDir, collisionDetect, move} from './game'

class Instruction {
	constructor(_movement, _color) {
		this.movement = _movement;
		this.color = _color;
	}
}

class Data {
	constructor(_map, _x, _y, _dir, _nbCollectible) {
		this.map = _map;
		this.x = _x;
		this.y = _y;
		this.dir = _dir;
		this.nbCollectible = _nbCollectible;
	}
}

class Game {
	constructor(_level, _instructions) {
		this.level = _level;
		this.instructions = _instructions;
	}
}

export function App() {
  const [selected, setSelected] = useState("");
  const [data, setData] = useState(new Data([], 0, 0, "left", 0));
  const [stop, setStop] = useState(false);
  const [level, setLevel] = useState(1);
  const [play, setPlay] = useState(false);
  const [instance, setInstance] = useState(new Game("lvl", []));
  const [returnCode, setReturnCode] = useState(-1);

  const [popUp, setPopUp] = useState(false);
  const [popUpText, setPopUpText] = useState("ft_popup");
  const [popUpButton, setPopUpButton] = useState("Go");

  async function resetData(gameInstance){
    
    let value;
    try {
      value = await getData(gameInstance.level);
      let newData = data;
      newData.map = value.map;
      newData.x = value.starting_pos.x;
      newData.y = value.starting_pos.y;
      newData.dir = value.starting_pos.dir
      newData.nbCollectible = countCollectible(value.map);

      setReturnCode(-1);
      setData(Object.assign(new Data(), newData));
    } catch (error) {
      console.log(error);
    }
  }

  async function createInstance(level) {
    let game;
    let value;
    try {
      value = await getData(level);
      
      let list = [];
      for (let i = 0; i < value.functions.length != 0; i++) {
        for (let j = 0; j < value.functions[i]; j++) {
          if (!list[i])
            list[i] = [];
          list[i].push(new Instruction(null, null));
        }
      }
      setInstance(new Game(level, list));
    } catch (error) {
      console.log("ERROR : " + error);
      return null;
    }
    let newData = data;
    newData.map = value.map;
    newData.x = value.starting_pos.x;
    newData.y = value.starting_pos.y;
    newData.dir = value.starting_pos.dir
    
    setData(Object.assign(new Data(), newData));
    return game;
  }

  async function constructGame(gameInstance) {
    let stopValue = stop;
    stopValue = false;
    setStop(stopValue);

    let value;
    try {
      value = await getData(gameInstance.level);
      let newData = data;
      newData.map = value.map;
      newData.x = value.starting_pos.x;
      newData.y = value.starting_pos.y;
      newData.dir = value.starting_pos.dir
      newData.nbCollectible = countCollectible(value.map);
      setReturnCode(-1);

      setData(Object.assign(new Data(), newData));
    } catch (error) {
      console.log(error);
      return null;
    }
  
    let code = await startFunction(gameInstance, 0);
    setReturnCode(code);
    setPlay(false);
    return code;
  }

  function stopGame() {
    setStop(true);
  }

  async function startFunction(gameInstance, listToDo) {
    for (let i = 0; i < gameInstance.instructions[listToDo].length && !stop; i++) {
      if (verifColor(gameInstance.instructions[listToDo][i].color, data.map, data) === true) {
        if (gameInstance.instructions[listToDo][i].movement == "forward") {
          setData(Object.assign(new Data(), move(data)));
          await sleep(deltaTime);
        } 
        else if (gameInstance.instructions[listToDo][i].movement == "left" || gameInstance.instructions[listToDo][i].movement == "right") {
          setData(Object.assign(new Data(), changeDir(gameInstance.instructions[listToDo][i].movement, data)));
          await sleep(deltaTime);
        }
        else if (gameInstance.instructions[listToDo][i].movement != null) {
          let tmp = await startFunction(gameInstance, gameInstance.instructions[listToDo][i].movement);
          if (tmp != 1)
            return tmp; 
        } else
          await sleep(deltaTime);
      }
      if (collisionDetect(data) == 1)
        return 2;
      setData(Object.assign(new Data(), collectCollectible(data)));
      if (data.nbCollectible == 0)
        return 0;
    }
    if (data.nbCollectible == 0)
      return 0;
    return 1;
  }

  useEffect(async () => {
    await createInstance(`level_${level}`);
    console.log("instance : ", instance);
  }, [level]);

  useEffect(async () => {
    if (returnCode != -1)
      setPopUp(true);

    if (returnCode == 0) {
      setPopUpText("You win !");
      setPopUpButton("Next level");
      if (level < 2) { // Condition a modifier selon le nb du level
        setLevel(level + 1);
      }
    } else if (returnCode == 1) {
      setPopUpText("Function over, you loose !");
      setPopUpButton("Retry");
    } else if (returnCode == 2) {
      setPopUpText("Out of map, you loose !");
      setPopUpButton("Retry");
    }
  }, [returnCode]);

  useEffect(async () => {
    if (play) {
      constructGame(instance);
    }
    console.log("code ", returnCode);
  }, [play]);

  return (
    <>
      <PopUp active={popUp} setActive={setPopUp} button={popUpButton} actionButton={resetData} game={instance}>{popUpText}</PopUp>
      <div className="bg-[#2d2d2d] w-screen flex flex-col justify-center items-center h-screen px-2 text-gray-800">
        <Level level={level} ></Level>
        <Canva data={data}></Canva>
        <Composition instance={instance} setInstance={setInstance} selected={selected} setSelected={setSelected} level={level}></Composition>
        <Controls constructGame={constructGame} game={instance} play={play} setPlay={setPlay} data={data}></Controls>
        <Toolbar functions={instance.instructions} selected={selected} setSelected={setSelected}></Toolbar>
        <div className="rotate-[45deg] rotate-[135deg] rotate-[225deg] rotate-[315deg]"></div>
      </div>
    </>
  )
}
