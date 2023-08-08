// let score: number | string = 33
// score = 44
// score = "55"

// let rgb: [number, number, number] = [255, 255, 255]

// // tupul can be like that real
// rgb.push(34)


enum SeatChoice {
  AISLE,
  MIDDLE,
  WINDOW,
  RANDOM,
}

const newSeat = SeatChoice.MIDDLE
console.log(newSeat)

interface User {
  readonly dbId: number,
  email: string,
  userId: number,
  googleId?: string
  startTrail?(): string
  getCoupon?(name: string, val: number): number
}

const inder: User = {
  dbId: 1,
  email: "h@h.com",
  userId: 2211,
  startTrail: () => {
    return "trail started";
  },
  getCoupon: (name: "inder", val: 1) => {
    return 1;
  }
}

const inder2: User = {
  dbId: 2,
  email: "h1",
  userId: 324,
}
