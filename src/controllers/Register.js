const db = require("../db/models");
const model = require("../db/models/register")(db.sequelize, db.Sequelize);

module.exports.GetRegisters = async () => {
    const response = await model.findAll();
    return response;
};

module.exports.GetRegisterById = async (id) => {
    const response = await model.findByPk(id);
    return response;
};

module.exports.CreateRegister = async (data) => {
    console.log(data);
    const response = await db.Register.create(data);
    return response;
};

module.exports.UpdateRegister = async (id, data) => {
    const register = await model.findByPk(id);
    if (!register) throw new Error('Register not found');
    await register.update(data);
    return register;
};

module.exports.DeleteRegister = async (id) => {
    const register = await model.findByPk(id);
    if (!register) throw new Error('Register not found');
    await register.destroy();
    return { message: 'Register deleted successfully' };
};
