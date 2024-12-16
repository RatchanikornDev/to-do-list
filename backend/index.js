const express = require("express");
const uuid = require("uuid");
const app = express();
const cors = require("cors");

const PORT = 3000;

app.use(express.json());
app.use(cors());

const todos = [
    {
        id: uuid.v4(),
        name: "Catch Jirachi",
        completed: true,
    },
    {
        id: uuid.v4(),
        name: "Catch Celebi",
        completed: false,
    },
    {
        id: uuid.v4(),
        name: "Catch Charizard",
        completed: true,
    },
];

// Route: Home Page
app.get("/", (req, res) => {
    res.json({ msg: "Todo List Home Page" });
});

// Route: Get all Todos
app.get("/todos", (req, res) => {
    res.json(todos);
});

// Route: Get a Todo by ID
app.get("/todos/:id", (req, res) => {
    let todo = todos.filter((todo) => todo.id == req.params.id);
    res.json({ msg: "1 Todo", data: todo});
});

// Route: Create a new Todo
app.post("/todos", (req, res) => {
    const newTodo = { 
        id: uuid.v4(), 
        name: req.body.name, 
        completed: req.body.completed 
    };
    todos.push(newTodo);
    res.json({ msg: "Add Todo", data: todos });
});

// Route: Update a Todo
app.put("/todos/:id", (req, res) => {
    const index = todos.findIndex((todo) => todo.id === req.params.id);
    
    if (index !== -1) {
        todos[index] = {
            id: req.params.id,
            name: req.body.name,
            completed: req.body.completed
        };
        res.json({ msg: "Edit Todo", data: todos });
    } else {
        res.status(404).json({ msg: "Todo not found." });
    }
});

// Route: Delete a Todo
app.delete("/todos/:id", (req, res) => {
    const index = todos.findIndex(todo => todo.id === req.params.id);
    
    if (index !== -1) {
        todos.splice(index, 1);
        res.json({ msg: "Delete Todo", data: todos });
    } else {
        res.status(404).json({ msg: "Todo not found." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
});