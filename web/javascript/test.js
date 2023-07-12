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

db.articles.insertMany(
[
    {
        "_id": "5c139771d79ac8eac11e754a",
        "content": "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer.",
        "title": "API"
    },
    {
        "_id": "5c1398aad79ac8eac11e7561",
        "content": "This is a framework developed by Twitter that contains pre-made front-end templates for web design",
        "title": "Bootstrap"
    },
    {
        "_id": "5c1398ecd79ac8eac11e7567",
        "content": "The Document Object Model is like an API for interacting with our HTML",
        "title": "DOM"
    },
    {
        "_id": "64ae8117f55a9a255c8c1333",
        "content": "content testing if it works",
        "title": "title"
    }
]
)

