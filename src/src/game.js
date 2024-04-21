let deltaTime = 1000;
let stopValue = false;
let data;

/*
	la classe Data est destinée à être globale pour ce fichier-là mais aussi pour l'affichage à la map.
	un tableau nomme map représentant la map (ligne en x et colonne en y);
	un entier nomme x représentant la position du player en x;
	un entier nomme y représentant la position du player en y;
	une chaine de caractèred nommer dir représentant la position du player comme ceci;
	"up" vers le haut
	"down" vers le bas
	"left" vers la gauche
	"right" vers la doite

	et un entier nomme _nbCollectible représentant le nombre de collectibles restant
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

const getData = async (level) => {
	try {
		const response = await fetch('./maps/'+ level + '.json');
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

//l'affichage a besoin d'une classe Game pour pouvoir appeler la fonction constructGame mais aussi pour pouvoir afficher la map par defaut et les instruction autorisees,
//pour cela il doit appeler la fonction createInstance avec en parametre le nom du niveau souhaite



// list_instruction['F1'] = [	new Instruction("forward", "blue"),
// 							new Instruction("forward", "blue"),
// 							new Instruction("left", null),
// 							new Instruction("left", null),
// 							new Instruction("forward", "red"),
// 							new Instruction("F2", null),
						 
// ];
// A FINIR DEMAIN
async function createInstance(level)
{
	let game;
	let value;
	try {
		value = await getData(level);
		
		let list = {};
		for (let i = 0; i < value.functions.length != 0; i++)
		{
			for (let j = 0; j < value.functions[i]; j++)
			{
				if (!list['F' + (i + 1)])
					list['F' + (i + 1)] = [];
				list['F' + (i + 1)].push(new Instruction(null, null));
			}
		}
		game = new Game(level, list);
	} catch (error) {
		console.log(error);
		// erreur a gerer
		return null;
	}
	data = new Data(value.map, value.starting_pos.x, value.starting_pos.y, value.starting_pos.dir, countCollectible(value.map))
	return game;
}


//fonction a appeler pour start la game, lire le commentaire en bas de page.
async function constructGame(gameInstance) {
	let value;
	try {
		value = await getData(gameInstance.level);
	
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

pour pouvoir démarrer une game vous avez besoin d'une instance de la classe game; 
pour cela vous avez 2 possibilités, le premier : créer votre classe vous-même, ce qui est un peu chiant et sujet à erreur.
c'est pour cela que ma grande personne a l'extrême générosité a pris la sage décision de créer une fonction qui le fait pour vous et vous retourne une instance de cette classe.
pour cela rien de plus simple, appeler la fonction createInstance("nameOfLvl") qui prend en paramètre le nom du level en question,
tant que ce nom-là est bien un fichier .json existant dans le dossier public/maps/ et qu'il est bien formaté (même pas besoin de mettre le path ou le .json à la fin car de toute évidence je suis trop généreux et vous facilite le travail).

cette fonction ne se contente pas seulement de vous retourner une classe Game, elle instancie aussi une classe Data déclarée en variable globale nommee data qui vous permet d'avoir accès à la map, la position de votre joueur et le nombre de collectible restant.
elle est declaree comme telle : 

class Data {
	constructor(_map, _x, _y, _dir, _nbCollectible) {
		this.map = _map;
		this.x = _x;
		this.y = _y;
		this.dir = _dir;
		this.nbCollectible = _nbCollectible;
	}
}

Tout changement effectué à la map(probablement par la fonction au prochain paragraphe), a la position du player ou encore au nombre de collectibles sera effectué dans cette variable globale.


bienvenue dans la fonction constructGame(), cette fonction permet de start la game mais aussi de la jouer entièrement, tout ce dont tu as besoin se situe dans la classe data.
et si jamais tu souhaites changer la vitesse entre chaque tour il existe une variable globale nommée deltaTime qui est en ms, tu peux la modifier quand tu veux.

pour démarrer une game appelez la fonction constructGame(), elle prend en paramètre une classe Game (qui peut être construite avec la fonction createInstance("nameOfLvl"), voir plus haut)
SI JAMAIS TU VEUX LA CONSTRUIRE A LA MAIN VOICI COMMENT ELLE SE COMPORTE : 
elle Se construit avec 2 arguments, 
Le premier est une chaine de caractères qui représente le nom du lvl (mais aussi le nom du fichier json en question);
Le deuxième est un objet nomme list_instruction(f1,f2,fx...) qui contient un tableau avec en premiere colonne une chaine de caractères et en deuxième une classe instruction prenant le mouvement effectué et la couleur de la case
formate comme ceci :

type de mouvement : 

"F1", "F2", "Fx..." (potentiellement un nombre infini de f)
"forward" (pour avancer)
"left" (pour aller a gauche (ouest pour julian)) oui - julian
"right" (pour aller a droite (est pour julian)) oui - julian
null (si la personne n'a pas donne d'instruction a cette case)

type de couleur :

"blue" (pour la couleur bleu)
"red" (pour la couleur rouge)
"green" (pour la couleur verte)
null (si la case n'a pas de couleur)

voici un exemple de comment on peut start une game : 


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


et voici une facon UN PEU plus simple et sans erreur pour le faire. 
*/

constructGame(await createInstance("level_1"));
