function HouseCleaner(name, age, hasLimbs) {
    this.name = name;
    this.age = age;
    this.hasLimbs = hasLimbs;
    this.clean = function() {
        console.log("cleaning in progress");
    }
}

var houseCleaner1 = new HouseCleaner("john", 24, true);
console.log(houseCleaner1.name);
houseCleaner1.clean();
