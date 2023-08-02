module.exports = (sequelize, Sequelize) => {
  const Panier = sequelize.define('panier', {
    etat: {
      type: Sequelize.INTEGER,
    },
    methode_paiement: {
      type: Sequelize.STRING,
    },
    iduser: {
      type: Sequelize.INTEGER,
    },
  })

  return Panier
}
