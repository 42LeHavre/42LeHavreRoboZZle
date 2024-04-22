# 42LeHavreRoboZZle

## Start the development server
To start the development server so you can start working on this project, you have to cd in src, install the node modules and run the vite server :

```
cd src
npm install
npm run dev
```

here is how this builds the map.json file :
```
level_1.json
{
	"map": [
		"b                  b",
		"                    ",
		"                    ",
		"                    ",
		"                    ",
		"        bbbbb       ",
		"       bbbbbbb      ",
		"       bBbbbBb      ",
		"       rbbbbbg      ",
		"        bbbbb       ",
		"                    ",
		"                    ",
		"                    ",
		"                    ",
		"b                  b"
	],
	"starting_pos": {
		"x": 10,
		"y": 7,
		"dir": "right"
	},
	"functions": [5, 2, 15,6 ,7, 6 ,3 ,7]
}
```

"map"[] represents the map under character string array form

b = Case blue.

r = Case red.

g = Case green.

when the letter is capitalized it means that a collectible places it on

B = Case blue + collectible.

r = Case red + collectible.

g = Case green + collectible.

"starting_pos" represents the position of the player in x and y, "dir" indicates ca direction in the form of  : 

"right"
"left"
"up"
"down"

"functions" represents an array that contains all the functions and the number of statements that can contain.

example:
```
"functions" : [5, 3]
```
there are 2 instructions, an F1 with 5 boxes and an F2 with 3 boxes

<img width="394" alt="Capture d’écran 2024-04-22 à 14 06 10" src="https://github.com/42LeHavre/42LeHavreRoboZZle/assets/90618758/23e62e80-55ce-4bbc-9156-8dd92c5b46ce">

