import { useState } from 'preact/hooks'
import { Level } from './components/Level'
import { Controls } from './components/Controls'
import { Canva } from './components/Canva'
import { Composition } from './components/Composition'
import { Toolbar } from './components/Toolbar'
import { useEffect } from 'preact/hooks'

import { sleep, getData, countCollectible, verifColor, collectCollectible, changeDir} from './game'

class Instruction
{
	constructor(_mouvement, _color) {
		this.mouvement = _mouvement;
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

//appeler la fonction createInstance("nameOfLvl") qui prend en paramètre le nom du level en question
//tant que ce nom-là est bien un fichier .json existant dans le dossier public/maps/ et qu'il est bien formaté (pas besoin de mettre le path ou le .json à la fin du nom)

export function App() {
  const [selected, setSelected] = useState(1);
  const [data, setData] = useState(new Data([],0, 0, "left", 0));
  const [stop, setStop] = useState(false);

  async function createInstance(level) {
    let game;
    let value;
    try {
      value = await getData(level);
      
      let list = {};
      for (let i = 0; i < value.functions.length != 0; i++) {
        for (let j = 0; j < value.functions[i]; j++) {
          if (!list['F' + (i + 1)])
            list['F' + (i + 1)] = [];
          list['F' + (i + 1)].push(new Instruction(null, null));
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
  
    let code = await startFunction(gameInstance, 'F1');
    return code;
  }

  function stopGame()
  {
    let stopValue = stop;
    stopValue = true;
    setStop(stopValue);
  }

  async function startFunction(gameInstance, listToDo) {
    for (let i = 0; i < gameInstance.instructions[listToDo].length && stop == true; i++) {
      await sleep(deltaTime);
      if (verifColor(gameInstance.instructions[listToDo][i].color, data.map) === true) {
        if (gameInstance.instructions[listToDo][i].mouvement == "forward")
          setData(move(data));
        else if (gameInstance.instructions[listToDo][i].mouvement == "left" || gameInstance.instructions[listToDo][i].mouvement == "right")
          setData(changeDir(gameInstance.instructions[listToDo][i].mouvement, data));
        else if (gameInstance.instructions[listToDo][i].mouvement != null) {
          let tmp = await startFunction(gameInstance, gameInstance.instructions[listToDo][i].mouvement);
          if (tmp != 1)
            return tmp;
        }
      }
      if (collisionDetect(data) == 1)
        return 2;

      setData(collectCollectible(data));

      if (data.nbCollectible == 0)
        return 0;
    }
    if (data.nbCollectible == 0)
      return 0;
    return 1;
  }
  

  // Examples
  const [functions, setFunctions] = useState([
    [
      {
        instruction: "none",
        color: "none",
      },
      {
        instruction: "none",
        color: "none",
      },
      {
        instruction: "none",
        color: "none",
      }
    ],
    [
      {
        instruction: "none",
        color: "none",
      },
      {
        instruction: "none",
        color: "none",
      },
      {
        instruction: "none",
        color: "none",
      }
    ],
    [
      {
        instruction: "none",
        color: "none",
      },
      {
        instruction: "none",
        color: "none",
      },
      {
        instruction: "none",
        color: "none",
      }
    ]
  ]);


  const [level, setLevel] = useState(1);
  const [pos, setPos] = useState({
    x: 10,
    y: 7,
    angle: 'right'
  })

  const [play, setPlay] = useState(false);
  let instance;

  useEffect(async () => {
    instance = await createInstance(`level_${level}`);
    console.log(await constructGame(instance));
   }, []);


  return (
    <>
      <div className="bg-[#2d2d2d] w-screen flex flex-col justify-center items-center h-screen px-2 text-gray-800">
        <Level level={level} ></Level>
        <Controls play={play}></Controls>
        <Canva position={pos}></Canva>
        <Composition functions={functions} setFunctions={setFunctions} selected={selected} setSelected={setSelected}></Composition>
        <Toolbar functions={functions} selected={selected} setSelected={setSelected}></Toolbar>
        <div className="rotate-[45deg] rotate-[135deg] rotate-[225deg] rotate-[315deg]"></div>
      </div>
    </>
  )
}
