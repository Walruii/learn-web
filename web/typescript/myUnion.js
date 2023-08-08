// let score: number | string = 33
// score = 44
// score = "55"
// let rgb: [number, number, number] = [255, 255, 255]
// // tupul can be like that real
// rgb.push(34)
var SeatChoice;
(function (SeatChoice) {
    SeatChoice[SeatChoice["AISLE"] = 0] = "AISLE";
    SeatChoice[SeatChoice["MIDDLE"] = 1] = "MIDDLE";
    SeatChoice[SeatChoice["WINDOW"] = 2] = "WINDOW";
    SeatChoice[SeatChoice["RANDOM"] = 3] = "RANDOM";
})(SeatChoice || (SeatChoice = {}));
var newSeat = SeatChoice.MIDDLE;
console.log(newSeat);
