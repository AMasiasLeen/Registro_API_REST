require("dotenv").config();

const express = require("express");
const session = require('express-session');

const path = require("path");
const routes = require('./routes');

const app = express();
const port = process.env.APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de sesiones
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_session_secret',
    resave: false,
    saveUninitialized: true
}));



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

// Rutas protegidas
app.use("/Machinery", authenticateJWT, routes.MachineryRoutes);
app.use("/Register", authenticateJWT, routes.RegisterRoutes);
app.use("/Owner", authenticateJWT, routes.OwnerRoutes);
app.use("/Operator", authenticateJWT, routes.OperatorRoutes);
app.use("/OwnerUser", authenticateJWT, routes.UserRoutes);

// Ruta para el login
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(port, () => {
    console.log("Server Online!");
});
