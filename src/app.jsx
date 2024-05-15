import { useRef, useState } from 'preact/hooks'
import { Level } from './components/Level'
import { Controls } from './components/Controls'
import { Canva } from './components/Canva'
import { Composition } from './components/Composition'
import { Toolbar } from './components/Toolbar'
import { useEffect } from 'preact/hooks'
import { PopUp } from './components/PopUp'
import Router from 'preact-router';

import { sleep, getData, countCollectible, verifColor, collectCollectible, changeDir, collisionDetect, move} from './game'
import { messages } from './messages'

const NB_LEVEL = 15;
export const THEME = true;

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
  const [data, setData] = useState(new Data([], 0, 0, "left", 0));
  const [instance, setInstance] = useState(new Game("lvl", []));

  const [stop, setStop] = useState(false);
  const [level, setLevel] = useState(1);
  const [returnCode, setReturnCode] = useState(-1);

  const [selected, setSelected] = useState("");
  const [play, setPlay] = useState(false);
  const playRef = useRef(play);

  const [popUp, setPopUp] = useState(false);
  const [popUpText, setPopUpText] = useState("ft_popup");
  const [popUpButton, setPopUpButton] = useState("Go");

  const [currentInst, setCurrentInst] = useState({x: -1, y: -1});
  const [deltaTime, setDeltaTime] = useState(1000);
  const refTime = useRef(deltaTime);

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
    setStop(false);

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
    for (let i = 0; i < gameInstance.instructions[listToDo].length && playRef.current; i++) {
      let curr = gameInstance.instructions[listToDo][i];
      setCurrentInst(({x: listToDo, y: i}));

      if (verifColor(curr.color, data.map, data) === true) {
        if (curr.movement == "forward") {
          setData(Object.assign(new Data(), move(data)));
          await sleep(refTime.current);
        } else if (curr.movement == "left" || curr.movement == "right") {
          setData(Object.assign(new Data(), changeDir(curr.movement, data)));
          await sleep(refTime.current);
        } else if (curr.movement != null) {
          await sleep((refTime.current) / 4);
          let tmp = await startFunction(gameInstance, curr.movement);
          if (tmp != 1)
            return tmp; 
        } else
          await sleep(refTime.current);
      }
      if (collisionDetect(data) == 1)
        return 2;

      setData(Object.assign(new Data(), collectCollectible(data)));
      if (data.nbCollectible == 0)
        return 0;
    }

    return playRef.current ?  !(data.nbCollectible == 0) : -2;
  }

  useEffect(() => {
	if (localStorage.getItem("level"))
	  setLevel(Number(localStorage.getItem("level")));
  }, []);

  useEffect(async () => {
    await createInstance(`level_${level}`);
    setSelected("");
    localStorage.setItem("level", level);
  }, [level]);

  useEffect(async () => {
    if (returnCode >= 0)
      setPopUp(true);
    else if (returnCode == -2)
      resetData(instance);
    setCurrentInst({x: -1, y: -1});

    if (returnCode == 0) {
      setPopUpButton(messages.win_level.button[THEME ? "theme" : "fr"]);

      if (THEME) {
        if (level == 1)
          setPopUpText("Bravo, niveau 1/3 réussi ! Tu peux passer au grand bain !");
        if (level == 2)
          setPopUpText("Bravo, niveau 2/3 réussi ! Bientôt champion !");
      } else
        setPopUpText(messages.win_level.label.fr);

      if (level < NB_LEVEL) {
          setLevel(level + 1);
      } else if (level == NB_LEVEL) {
        setPopUpText(messages.win_game.label[THEME ? "theme" : "fr"]);
        setPopUpButton(messages.win_game.button[THEME ? "theme" : "fr"]);
      }

    } else if (returnCode == 1) {
      setPopUpText(messages.function_over.label[THEME ? "theme" : "fr"]);
      setPopUpButton(messages.function_over.button[THEME ? "theme" : "fr"]);
    } else if (returnCode == 2) {
      setPopUpText(messages.out_of_map.label[THEME ? "theme" : "fr"]);
      setPopUpButton(messages.out_of_map.button[THEME ? "theme" : "fr"]);
    }
  }, [returnCode]);

  useEffect(async () => {
    if (play)
      constructGame(instance);
      playRef.current = play;
  }, [play]);

  useEffect(() => {
    refTime.current = deltaTime;
  }, [deltaTime]);

  return (
    <>
      <Router>
        <div path="/42LeHavreRoboZZle/">
          <PopUp active={popUp} setActive={setPopUp} button={popUpButton} actionButton={resetData} game={instance}>{popUpText}</PopUp>
          <div className="bg-[#2d2d2d] w-screen flex flex-col justify-center items-center h-screen px-2 text-gray-800">
            <Level level={level} setLevel={setLevel}></Level>
            <Canva data={data}></Canva>
            <Composition play={play} instance={instance} setInstance={setInstance} selected={selected} level={level} currentInst={currentInst}></Composition>
            <Controls game={instance} play={play} setPlay={setPlay} data={data} setStop={setStop} stop={stop} setDeltaTime={setDeltaTime} deltaTime={deltaTime}></Controls>
            <Toolbar functions={instance.instructions} selected={selected} setSelected={setSelected}></Toolbar>
            <div className='rotate-[45deg]'/>
            <div className='rotate-[135deg]'/>
            <div className='rotate-[225deg]'/>
            <div className='rotate-[315deg]'/>
          </div>
        </div>
        <div default className="w-screen h-screen flex justify-center items-center text-xl font-semibold text-white bg-[#2d2d2d]">
          <h1>404 : Not found</h1>
        </div>
      </Router>
    </>
  )
}
