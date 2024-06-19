const db = require("../db/models");
const model = require("../db/models/owner")(db.sequelize, db.Sequelize);

module.exports.GetOwners = async () => {
    const response = await model.findAll();
    return response;
};

module.exports.GetOwnerById = async (id) => {
    const response = await model.findByPk(id);
    return response;
};

module.exports.CreateOwner = async (data) => {
    console.log(data);
    const response = await db.Owner.create(data);
    return response;
};

module.exports.UpdateOwner = async (id, data) => {
    const owner = await model.findByPk(id);
    if (!owner) throw new Error('Owner not found');
    await owner.update(data);
    return owner;
};

module.exports.DeleteOwner = async (id) => {
    const owner = await model.findByPk(id);
    if (!owner) throw new Error('Owner not found');
    await owner.destroy();
    return { message: 'Owner deleted successfully' };
};
