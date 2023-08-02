module.exports = (sequelize, Sequelize) => {
  const Participation = sequelize.define('participation', {
    date_participation: {
      type: Sequelize.STRING,
    },
    numero_place: {
      type: Sequelize.STRING,
    },
    // image: {
    //   type: Sequelize.STRING,
    // },
    type: {
      type: Sequelize.STRING,
    },
    methode_payement: {
      type: Sequelize.INTEGER,
    },
    iduser: {
      type: Sequelize.INTEGER,
    },
    idevenement: {
      type: Sequelize.INTEGER,
    },
  })
  return Participation
}
