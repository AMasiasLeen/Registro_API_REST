const db = require("../db/models");
const model = require("../db/models/operator")(db.sequelize, db.Sequelize);

module.exports.GetOperators = async () => {
    const response = await model.findAll();
    return response;
};

module.exports.GetOperatorById = async (id) => {
    const response = await model.findByPk(id);
    return response;
};

module.exports.CreateOperator = async (data) => {
    console.log(data);
    const response = await db.Operator.create(data);
    return response;
};

module.exports.UpdateOperator = async (id, data) => {
    const operator = await model.findByPk(id);
    if (!operator) throw new Error('Operator not found');
    await operator.update(data);
    return operator;
};

module.exports.DeleteOperator = async (id) => {
    const operator = await model.findByPk(id);
    if (!operator) throw new Error('Operator not found');
    await operator.destroy();
    return { message: 'Operator deleted successfully' };
};
