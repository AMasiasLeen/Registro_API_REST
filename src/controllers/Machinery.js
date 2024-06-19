const db = require("../db/models");
const model = require("../db/models/machinery")(db.sequelize, db.Sequelize);

module.exports.GetMachines = async () => {
    const response = await model.findAll();
    return response;
};

module.exports.GetMachineById = async (id) => {
    const response = await model.findByPk(id);
    return response;
};

module.exports.CreateMachine = async (data) => {
    console.log(data);
    const response = await db.Machinery.create(data);
    return response;
};

module.exports.UpdateMachine = async (id, data) => {
    const machine = await model.findByPk(id);
    if (!machine) throw new Error('Machine not found');
    await machine.update(data);
    return machine;
};

module.exports.DeleteMachine = async (id) => {
    const machine = await model.findByPk(id);
    if (!machine) throw new Error('Machine not found');
    await machine.destroy();
    return { message: 'Machine deleted successfully' };
};
