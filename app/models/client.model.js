module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define('client', {
    nationalite: {
      type: Sequelize.STRING,
    },
    adress_livraison: {
      type: Sequelize.STRING,
    },
    count_achat: {
      type: Sequelize.INTEGER,
    },
  })
  return Client
}
