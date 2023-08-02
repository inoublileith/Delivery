module.exports = (sequelize, Sequelize) => {
  const Produit = sequelize.define('produit', {
    titre: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    // image: {
    //   type: Sequelize.STRING,
    // },
    prix: {
      type: Sequelize.STRING,
    },
    quantite: {
      type: Sequelize.INTEGER,
    },
    promotion: {
      type: Sequelize.INTEGER,
    },
    remise: {
      type: Sequelize.INTEGER,
    },
    code_promo: {
      type: Sequelize.STRING,
    },
    etat: {
      type: Sequelize.INTEGER,
    },
    iduser: {
      type: Sequelize.INTEGER,
    },
  })
  return Produit
}
