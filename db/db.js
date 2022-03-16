//sequelize

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_react_redux"
);
const { STRING } = Sequelize.DataTypes;
const faker = require("faker");



const Guitarist = sequelize.define("guitarist", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

const Guitar = sequelize.define("guitar", {
  name: {
    type: STRING,
    allownull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Guitarist.generateRandom = function () {
    return this.create({ name: `Band Name: ${faker.company.companyName()} ` });
  };
  
  Guitarist.belongsTo(Guitar);
  Guitar.hasMany(Guitarist);

module.exports = {
    Guitar,
    Guitarist,
    sequelize
}