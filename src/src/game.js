let deltaTime = 1000;
let stopValue = false;
let data;

/*
	la classe Data est destinée à être global pour ce fichier-là mais aussi pour l'affichage à la map.
	un tableau nommait map représentant la map (ligne en x et collone en y);
	un entier nommait x représentant la position du payeur en x;
	un entier nommait y représentant la position du payeur en y;
	une chaine de caractère nommer dir représentant la position du payeur comme ceci;
	"up" vers le haut
	"down" vers le bas
	"left" vers la gauche
	"right" vers la doite

	et un entier nommait _nbCollectible représentant le nombre de collectible restant
*/

class Data{
	constructor(_map, _x, _y, _dir, _nbCollectible) {
		this.map = _map;
		this.x = _x;
		this.y = _y;
		this.dir = _dir;
		this.nbCollectible = _nbCollectible;
	}
}

class Instruction
{
	constructor(_mouvement, _color) {
		this.mouvement = _mouvement;
		this.color = _color;
	}
}

class Game{
	constructor(_level, _list_instruction) {
		this.level = _level;
		this.list_instruction = _list_instruction;
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const getData = async () => {
	try {
		const response = await fetch('./maps/level_1.json');
		if (!response.ok) {
			throw new Error('Error retrieving JSON data');
		}
		const myJson = await response.json();
		return myJson;
	} catch (error) {
		console.error('ERROR : fetch failed', error);
		throw error;
	}
}

function countCollectible(map)
{
	let nbCollectible = 0;
	for(let i = 0; i < map.length; i++)
	{
		const row = map[i];
		for (let j = 0; j < row.length; j++)
		{
			if (row[j] == 'B' || row[j] == 'R' || row[j] == 'G')
				nbCollectible ++;
		}
	}
	return nbCollectible;
}

function verifColor(color){
	if (color == null)
		return true;
	if (color == "blue" && (data.map[data.y][data.x] == 'b' || data.map[data.y][data.x] == 'B'))
		return true;
	if (color == "red" && (data.map[data.y][data.x] == 'r' || data.map[data.y][data.x] == 'R'))
		return true;
	if (color == "green" && (data.map[data.y][data.x] == 'g' || data.map[data.y][data.x] == 'G'))
		return true;
	return false;
}

//fonction a appeler pour stoper la game.
function stopGame()
{
	stopValue = true;
}

//l'affichage a besoin d'une classe Game pour pouvoir appeler la fonction constructGame mais aussi pour pouvoir afficher la map par defaut et les instruction autoriser,
//pour cela il doit appeler la fonction createInstance avec en paremetre le nom du niveau souhaiter



// list_instruction['F1'] = [	new Instruction("forward", "blue"),
// 							new Instruction("forward", "blue"),
// 							new Instruction("left", null),
// 							new Instruction("left", null),
// 							new Instruction("forward", "red"),
// 							new Instruction("F2", null),
						 
// ];
// A FINIR DEMAIN
function createInstance(level)
{
	let game;
	try {
		let value = getData();

		let list = {};
		for (let i = 0; i < value.functions.length; i++)
		{
			list['F' + (i + 1)] = []
		}

		data = new game(level,);
	} catch (error) {
		console.log(error);
		// erreur a gerer
		return null;
	}
	return game;
}


//fonction a appeler pour start la game, lire le commentaire en bas de page.
async function constructGame(gameInstance) {
	let value;
	try {
		value = await getData();

		data = new Data(value.map, value.starting_pos.x, value.starting_pos.y, value.starting_pos.dir, countCollectible(value.map));
	} catch (error) {
		console.log(error);
		// erreur a gerer
		return ;
	}
	console.log(gameInstance.level);
	let Code = await startFunction(gameInstance, 'F1');

	//la fonction doit retourner le code de fin, 0 si ca c'est bien passer, 1 si j'arrive a la fin des instruction et qu'il reste des 42, et 2 si la je sort de la map.
	console.log("code de fin : " + Code);

	//je renitialise la map
	data = new Data(value.map, value.starting_pos.x, value.starting_pos.y, value.starting_pos.dir, countCollectible(value.map));
	return Code;
}

function moov()
{
	if (data.dir == "up")
		data.y --;
	else if (data.dir == "down")
		data.y ++;
	else if (data.dir == "left")
		data.x --;
	else if (data.dir == "right")
		data.x ++;
}

function changeDir(dir)
{
	if (dir == "left")
	{
		switch (data.dir){
			case "up" :
				data.dir = "right";
				break;
			case "down" :
					data.dir = "left";
					break;
			case "left" :
				data.dir = "up";
				break;
			case "right" :
				data.dir = "down";
				break;
		}
	}
	else
	{
		switch (data.dir){
			case "up" :
				data.dir = "left";
				break;
			case "down" :
					data.dir = "right";
					break;
			case "left" :
				data.dir = "down";
				break;
			case "right" :
				data.dir = "up";
				break;
		}
	}

}

function collisionDetect()
{
	if (data.x < 0 || data.y < 0 || data.y >= data.map.length || data.x >= data.map[data.y].length) // si je sort du tableau de la map
		return 1;
	if (data.map[data.y][data.x] == ' ')
		return 1;
	return 0;
}

function collectCollectible()
{
	const line = data.map[data.y].split("");
	if (line[data.x] == 'B')
		line[data.x] = 'b';
	else if (line[data.x] == 'R')
		line[data.x] = 'r';
	else if (line[data.x] == 'G')
		line[data.x] = 'g';
	data.map[data.y] = line.join("");
}

function printMapTest()
{
	let test = "";
	for(let i = 0; i < data.map.length; i++)
	{
		const row = data.map[i];

		for (let j = 0; j < row.length; j++)
		{
			if(i == data.y && j == data.x)
			{
				switch (data.dir){
					case "up":
						test += "^";
						break;
					case "down":
						test += "|";
						break;
					case "right":
						test += ">";
						break;
					case "left":
						test += "<";
						break;
				}
			}else 
				test += row[j];
		}
		test += '\n';
	}
	console.log(test);
	console.log("\n\n");
}

//cette fonction retourner le code de fin, 0 si ca c'est bien passer, 1 si j'arrive a la fin des instruction et qu'il reste des 42, et 2 si la je sort de la map.
async function startFunction(gameInstance, listToDo)
{
	for (let i = 0; i < gameInstance.list_instruction[listToDo].length || stopValue; i++)
	{
		await sleep(deltaTime);
		console.log(gameInstance.list_instruction[listToDo][i]);
		if (verifColor(gameInstance.list_instruction[listToDo][i].color) === true)
		{
			if (gameInstance.list_instruction[listToDo][i].mouvement == "forward")
				moov();
			else if (gameInstance.list_instruction[listToDo][i].mouvement == "left" || gameInstance.list_instruction[listToDo][i].mouvement == "right")
				changeDir(gameInstance.list_instruction[listToDo][i].mouvement);
			else if (gameInstance.list_instruction[listToDo][i].mouvement != null)
			{
				let tmp = await startFunction(gameInstance, gameInstance.list_instruction[listToDo][i].mouvement);
				if (tmp != 1)
					return tmp;
			}
		}
		printMapTest();
		if (collisionDetect() == 1)
			return 2;
		collectCollectible();
		data.nbCollectible = countCollectible(data.map);
		if (data.nbCollectible == 0)
			return 0;
	}
	if (data.nbCollectible == 0)
		return 0;
	return 1;
}

/*

pour démarrer une gamme appelée la fonction constructGame(), elle prend en paramètre une classe game qui ce construit avec 2 argument, 
Le premier une chaine de caractère qui représente le nom du lvl (mais aussi le nom du fichier json en question);
Le deuxième est un object nomer list_instruction(f1,f2,fx...) qui Contient un tableau avec en premier colonne une chaine de caractère et en deuxième une class d'instruction prenant le mouvement effectué et la couleur de la case
formater comme ceci :

type de mouvement : 

"F1", "F2", "Fx..." (potentielement un nombre infinie de f)
"forward" (pour avancer)
"left" (pour aller a gauche (ouest pour julian))
"right" (pour aller a droite (est pour julian))
null (si la personne n'as pas donner d'instruction a cette case)

type de couleur :

"blue" (pour la couleur bleu)
"red" (pour la couleur rouge)
"green" (pour la couleur verte)
null (si la case n'as pas de couleur)

voici un exemble : 
*/

let level = "level_1";
let list_instruction = {};
list_instruction['F1'] = [	new Instruction("forward", "blue"),
							new Instruction("forward", "blue"),
							new Instruction("left", null),
							new Instruction("left", null),
							new Instruction("forward", "red"),
							new Instruction("F2", null),
						 
];
list_instruction['F2'] = [	new Instruction("forward", "blue"),
							new Instruction("forward", "blue"),
							new Instruction("left", "blue"),
							new Instruction("left", "blue"),
							new Instruction("forward", "blue"),
							new Instruction("forward", "red"),
							new Instruction("forward", null),
							new Instruction("F3", null),
];

list_instruction['F3'] = [	new Instruction("right", "blue"),
							new Instruction("F3", "blue"),
							
];
				
let gameInstance = new Game(level, list_instruction);

constructGame(gameInstance);