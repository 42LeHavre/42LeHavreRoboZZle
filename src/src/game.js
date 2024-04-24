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

class Data {
	constructor(_map, _x, _y, _dir, _nbCollectible) {
		this.map = _map;
		this.x = _x;
		this.y = _y;
		this.dir = _dir;
		this.nbCollectible = _nbCollectible;
	}
}

class Instruction {
	constructor(_movement, _color) {
		this.movement = _movement;
		this.color = _color;
	}
}

class Game {
	constructor(_level, _instructions) {
		this.level = _level;
		this.instructions = _instructions;
	}
}


export function move(data) {
	let newData = data;
	if (newData.dir == "up")
		newData.y --;
	else if (newData.dir == "down")
		newData.y ++;
	else if (newData.dir == "left")
		newData.x --;
	else if (newData.dir == "right")
		newData.x ++;
	return newData;
}

export function changeDir(dir, data) {
	let newData = data;
	if (dir == "left") {
		switch (newData.dir) {
			case "up" :
				newData.dir = "left";
				break;
			case "down" :
					newData.dir = "right";
					break;
			case "left" :
				newData.dir = "down";
				break;
			case "right" :
				newData.dir = "up";
				break;
		}
	}
	else {
		switch (newData.dir) {
			case "up" :
				newData.dir = "right";
				break;
			case "down" :
					newData.dir = "left";
					break;
			case "left" :
				newData.dir = "up";
				break;
			case "right" :
				newData.dir = "down";
				break;
		}
	}
	return newData;
}

export function collectCollectible(data) {
	let newData = data
	const line = data.map[data.y].split("");
	if (line[data.x] == 'B')
		line[data.x] = 'b';
	else if (line[data.x] == 'R')
		line[data.x] = 'r';
	else if (line[data.x] == 'G')
		line[data.x] = 'g';
	newData.map[data.y] = line.join("");
	newData.nbCollectible = countCollectible(newData.map);
	return data;
}

export function collisionDetect(data) {
	if (data.x < 0 || data.y < 0 || data.y >= data.map.length || data.x >= data.map[data.y].length)
		return 1;
	if (data.map[data.y][data.x] == ' ')
		return 1;
	return 0;
}

export function verifColor(color, map, data) {
	if (color == null)
		return true;
	if (color == "blue" && (map[data.y][data.x] == 'b' || map[data.y][data.x] == 'B'))
		return true;
	if (color == "red" && (map[data.y][data.x] == 'r' || map[data.y][data.x] == 'R'))
		return true;
	if (color == "green" && (map[data.y][data.x] == 'g' || map[data.y][data.x] == 'G'))
		return true;
	return false;
}

export function countCollectible(map) {
	let nbCollectible = 0;
	for(let i = 0; i < map.length; i++) {
		const row = map[i];
		for (let j = 0; j < row.length; j++) {
			if (row[j] == 'B' || row[j] == 'R' || row[j] == 'G')
				nbCollectible ++;
		}
	}
	return nbCollectible;
}

export const getData = async (level) => {
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

export function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}