import generateName from "sillyname";
import superHeroes from "superheroes";
// var generateName = require("sillyname");

var sillyName = generateName();
var hero = superHeroes.random();

console.log("my name is " + sillyName + "." + hero);
