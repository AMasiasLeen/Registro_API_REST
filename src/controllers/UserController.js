const db = require("../db/models");
const model = require("../db/models/user")(db.sequelize, db.Sequelize);

const bcrypt = require("bcrypt")


module.exports.CreateUser = async (data) => {
    const response = await model.create({
        name: data.name,
        email: data.email,
        password: data.password
    });
    return response;
}

module.exports.FindUserByEmail = async (data) => {
    let user = await model.findAll({
        where: {
            email: data.email
        }
    });

    if (UserRoutes.length > 0) {
        let pass = await bcrypt.compare(data.password, user[0].password)
        console.log(pass)
        return pass

    }

    return false;
}
