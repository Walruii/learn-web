var output = []
function FizzBuzz(){

  for (i = 0; i < 100; i++) {
    if (i % 3 == 0 && i % 5 != 0) {
      // console.log("Fizz");
      output.push("Fizz");
    }
    else if (i % 5 == 0 && i % 3 != 0) {
      // console.log("Buzz");
      output.push("Buzz");
    }
    else if (i % 3 == 0 && i % 5 == 0) {
      // console.log("FizzBuzz")
      output.push("FizzBuzz");
    }
    else {
      output.push(i);
    }
  }
}
FizzBuzz();
console.log(output);
