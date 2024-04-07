const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const EmployeeModel = require('./models/Employee');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employee");

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user && user.password === password) {
                res.json("Success");
            } else {
                res.json("The email or password is incorrect");
            }
        })
        .catch(error => {
            console.error("Error during login:", error);
            res.status(500).json("Internal Server Error");
        });
});

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.status(500).json(err));
});

app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});
