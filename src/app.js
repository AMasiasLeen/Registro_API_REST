require("dotenv").config()

const express = require("express")
const port = process.env.APP_PORT
const app = express()
app.use(express.json())

const routes = require('./routes');

app.use("/Machinery", routes.MachineryRoutes)
app.use("/Register", routes.RegisterRoutes)
app.use("/Owner", routes.OwnerRoutes)
app.use("/Operator", routes.OperatorRoutes)



app.listen(port, () => {
    console.log("Uh oh")
})