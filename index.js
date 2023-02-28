// // npm install nodemon -D  => restarts server; I've created a scrip on package.json to initialize this.
// // every time we save, the server is restarted
// // we also created a start script for prod

// // import the HTTP capability into our app
// const http = require('http');

// // create a server that lets us see requests and respond to them
// const server = http.createServer((req, res) => {
//     // res.setHeader("Content-tType", "text/html") => changes the type passed to the server
//     // console.log(req.method) // these methods are used to check which method and url are used. They aren't necessary when using Express.
//     // console.log(req.url)
//     res.end("hello") // .end => send a response a terminates connection (?)
// })

// // start the server listening
// // binds the connectio to a port
// server.listen(3000, () => {
//     console.log("Server ready")
// }) //shouldn't be < 1024
// // http://localhost:3000 on the browser to access this server



// expressjs.com => documentation
// npm install express -> this time it shouldn't be a dev dep because prod will need it
// const express = require('express'); // importing express
// const app = express(); // creating a server
// const port = 3000;

// // create our routing
// app.get('/', (req, res) => {
//     res.send("Hello"); // express recongnizes automatically the type passed
// })

// app.get('/chickens', (req, res) => {
//     res.send("Hello, chicken.") // there's a rule (RESTful rules) that paths should be plural
//     try {
//         res.status(200).send("Hello, chickens")
//     }

//     catch {
//         res.status(404)
//     }
// })

// app.get('/chickens/:id', (req, res) => {
//     console.log(req.params) // access the 'id' part of the path (all params passed to this path)
//     res.send(req.params.id) // access only the id or const {id} = req.params; // this syntax allows to pass more than one key (destructuring assignment syntax)
// }) // dynamic path -> changes according to the request sent
// // start the server listening
// app.listen(port, () => {
//     console.log(`App is listening on port ${port}`)
// })

// when using http we need to say which path the user can't access, and express does it automatically (it will only be accessible
// if we create another root)


require('dotenv').config(); // to have access to .env variables, should be at the top to variables are accessbible to everything on this file

const express = require('express');
const cors = require('cors'); // another middleware
const app = express(); // caseSensitive: false;
const port = process.env.PORT;
const fruits = require('./fruits.json')

app.use(cors()); // this will avoid connection problem between client and server
app.use(express.json()) //middleware -> it will take the body json file and transform it into js, happens between the request and response

// Home route
app.get('/', (req, res) => {
    res.send(`Hello, Fruity API!`)
})

// Return all fruits route
app.get('/fruits', (req, res) => {
    res.status(200).send(fruits)
})

// Return a single fruit route
// error hadling (if fruit is not found)
// fruit with no capital letters
app.get('/fruits/:name', (req, res) => {
    // let userFruit = req.params.fruit
    // if (userFruit !== `${userFruit[0].toUpperCase()}${userFruit.slice(1).toLowerCase()}`) {
    //     userFruit = `${userFruit[0].toUpperCase()}${userFruit.slice(1).toLowerCase()}`
    // }
    const name = req.params.name.toLowerCase()
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() === name);
    if (fruit === undefined) {
        res.status(404).send()
    }
    else {
        res.status(200).send(fruit)
    }
    // res.send(userFruit)
    // fruits.forEach(el => {
    //     if (el.name === userFruit) {
    //         return res.status(200).send(el)
    //     }
    //     else {
    //         return res.status(404).send("Invalid fruit.")
    //     }
    // })
    })

app.post("/fruits", (req, res) => {
    // check if the fruit is in the data or not
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == req.body.name.toLowerCase())
    console.log(fruit) // it's undefined since fruit is found
    // res.send("hello")
    if (fruit != undefined) {
        res.status(409).send();
    }
    else {
        fruits.push(req.body);

        res.status(201).send(req.body); // 201 when something is created
    }
    // if the fruit doesn't exit, then can use 'req.body' to add fruit to the data
    // if the fruit doest exist, return some kind of error.
    // console.log(req.body) // needs middleware, i'll need to write into thunder client's post body thing which info i want
    
    // let newFruit = req.body
    // // console.log(newFruit)
    // let newFruitName = newFruit.name
    // res.send(newFruitName)
    // console.log(newFruitName)
        //const fruit = fruits.find((fruit) => fruit.name.toLowerCase() === name);

        // const isUnique = fruits.find((newFruitName) => newFruitName === fruits.name)
        // console.log(isUnique)

//     fruits.forEach(el => {
//         // console.log(el.name)
//         if (el.name === newFruitName) {
//             console.log("same fruit")
//         }
//         else {
//             console.log("not the same fruit")
//             res.send("test")
//         }
// })
    })


// API testing insomnia hoppscotch postman
// thunderclient.com

app.listen(port, () => {
    console.log(`App listening on port ${port}.`)
})

// function getFruitInfo(fruitName) {
//     fruits.forEach(el => {
//         if (el.name === fruitName) {
//             console.log(fruitName)
//             return fruitName
//         }
//     })
// }