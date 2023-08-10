// interface User {
//   name: string,
//   rollNo: number,
//   id?: number
// }
// const inder: User = {name: "inder", rollNo: 2236816}

class User {

  constructor(private name: string, protected rollNo: number) { }
  get getName(): string {
    return this.name;
  }
  set setName(name: string) {
    this.name = name;
  }
}

class SubUser extends User {
  isFamily: boolean = true
  changeRoll(rollNo: number): void {
    this.rollNo = rollNo;
  }
}

let im = new User("inder", 2236816);

interface TakePhoto {
  cameraMode: string
  filter: string
  burst: number
}

class Instagram implements TakePhoto {
  constructor(public cameraMode: string, public filter: string, public burst: number) { }
}

function whoami<T>(val: T) : T {
  return val
}

whoami<string>("3")
