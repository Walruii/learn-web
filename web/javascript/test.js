db.products.insertOne({
    _id: 2,
    name: "Pencil",
    stock: 12,
    reviews: [
        {
            author: "gamer1",
            rating: 5,
            review: "IT WAS AMAZING",
        },
        {
            author: "gamer2",
            rating: 3,
            review: "It was alright",
        }
    ]
})
