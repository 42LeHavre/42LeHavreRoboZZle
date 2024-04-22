import { useState } from 'preact/hooks'
import { Level } from './components/Level'
import { Controls } from './components/Controls'
import { Canva } from './components/Canva'
import { Composition } from './components/Composition'
import { Toolbar } from './components/Toolbar'
import { useEffect } from 'preact/hooks'

import { deltaTime, sleep, getData, countCollectible, verifColor, collectCollectible, changeDir, collisionDetect, move} from './game'

class Instruction
{
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
    this.returnCode = -1;
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
      game = new Game(level, list);
    } catch (error) {
      console.log("ERROR : " + error);
      return null;
    }
    setData(new Data(value.map, value.starting_pos.x, value.starting_pos.y, value.starting_pos.dir, countCollectible(value.map)));
    
    return game;
  }

  async function constructGame(gameInstance) {
    let stopValue = stop;
    stopValue = true;
    setStop(stopValue);

    let value;
    try {
      value = await getData(gameInstance.level);

      setData(new Data(value.map, value.starting_pos.x, value.starting_pos.y, value.starting_pos.dir, countCollectible(value.map)));
    } catch (error) {

      console.log(error);
      return ;
    }
  
    let code = await startFunction(gameInstance, 0);
    let newData = data;
    newData.value = code;
    setData(Object.assign(new Data(), newData));
    return code;
  }

  function stopGame()
  {
    setStop(true);
  }

  async function startFunction(gameInstance, listToDo) {
    for (let i = 0; i < gameInstance.instructions[listToDo].length && !stop; i++) {
      // console.log(data);
      if (verifColor(gameInstance.instructions[listToDo][i].color, data.map, data) === true) {
        if (gameInstance.instructions[listToDo][i].movement == "forward")
        {
          setData(Object.assign(new Data(), move(data)));
          await sleep(deltaTime);
        } 
        else if (gameInstance.instructions[listToDo][i].movement == "left" || gameInstance.instructions[listToDo][i].movement == "right")
        {
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
      
      // console.log(gameInstance)

    }

    if (data.nbCollectible == 0) //ici je return 0 si j'ai recuperer tout les collectible
      return 0;
    
    return 1; //ici je return 1 si les instruction ce sont fini 
  }

  const [level, setLevel] = useState(1);
  const [play, setPlay] = useState(false);
  const [instance, setInstance] = useState(new Game("lvl", []));

  useEffect(async () => {
    setInstance(await createInstance(`level_${level}`));
  }, []);

  // Have to rebuild the logic inside the interval
  useEffect(() => {
    // let interval;
    if (play) {

      // if (i < )
      constructGame(instance);
    }

    // return () => clearInterval(interval);
    

  }, [play]);

  return (
    <>
      <div className="bg-[#2d2d2d] w-screen flex flex-col justify-center items-center h-screen px-2 text-gray-800">
        <Level level={level} ></Level>
        <Canva data={data}></Canva>
        <Composition instance={instance} setInstance={setInstance} selected={selected} setSelected={setSelected}></Composition>
        <Controls constructGame={constructGame} game={instance} play={play} setPlay={setPlay}></Controls>
        <Toolbar functions={instance.instructions} selected={selected} setSelected={setSelected}></Toolbar>
        <div className="rotate-[45deg] rotate-[135deg] rotate-[225deg] rotate-[315deg]"></div>
      </div>
    </>
  )
}
