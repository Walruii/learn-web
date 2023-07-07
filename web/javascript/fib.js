var fibNumbers = [0];
var a = 0;
var b = 1;
for (var i = 0; i < 10; i++) {
  var fibNo = a + b;
  a = b;
  b = fibNo;
  fibNumbers.push(fibNo);
}
console.log(fibNumbers);
