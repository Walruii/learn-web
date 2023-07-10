
const  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    shape: String
});

const Fruit = mongoose.model("fruit", fruitSchema);

const fruit = new Fruit ({
    name: "kiwi",
    rating: 10,
    shape: "round"
});

// fruit.save();

const humanSchema = new mongoose.Schema ({
    name: String,
    age: Number
});

const Human = mongoose.model("human", humanSchema);

const human = new Human ({
    name: "John",
    age: 37
});

// human.save();

const banana = new Fruit ({
    name: "banana",
    rating: 6,
    shape: "long"
});

const orange = new Fruit ({
    name: "Orange",
    rating: 9,
    shape: "round"
});

const strawberry = new Fruit ({
    name: "strawberry",
    rating: 9,
    shape: "roundish"
});

async function updateFruit() {

    const res = await Fruit.updateOne({_id: "64aadb43ce7d2ddb0f312bb8"}, {name: "Peach"});

}

// updateFruit();

async function deleteFruit() {

    const res = await Fruit.deleteOne({name: "Peach"});

}

async function deleteMHumans() {

    const res = await Human.deleteMany({name: "John"});
}

// deleteMHumans();

// deleteFruit();

// Fruit.insertMany([banana, orange, strawberry]);
async function myfruits() {

    const fruits= await Fruit.find({});
    fruits.forEach(function(fruit){
        console.log(fruit);
    });
    mongoose.connection.close();

}

myfruits();


