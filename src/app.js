require("dotenv").config()

const express = require("express")
const port = process.env.APP_PORT
const app = express()
const jwt = require('jsonwebtoken');

const path = require("path")

app.use(express.json());


const routes = require('./routes');

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views","index.html"))
})


// Middleware para autenticar usuarios
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.use("/Machinery", routes.MachineryRoutes)
app.use("/Register", routes.RegisterRoutes)
app.use("/Owner", routes.OwnerRoutes)
app.use("/Operator", routes.OperatorRoutes)
app.use("OwnerUser",routes.UserRoutes)

app.listen(port, () => {
    console.log("Server Online!")
})




