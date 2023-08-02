module.exports = (sequelize, Sequelize) => {
  const Fournisseur = sequelize.define('fournisseur', {
    entreprise: {
      type: Sequelize.STRING,
    },
    MF: {
      type: Sequelize.STRING,
    },
    // image: {
    //   type: Sequelize.STRING,
    // },
    RC: {
      type: Sequelize.STRING,
    },
    adress_entreprise: {
      type: Sequelize.STRING,
    },
    telephone_entreprise: {
      type: Sequelize.STRING,
    },
    web_site: {
      type: Sequelize.STRING,
    },
    page_facebook: {
      type: Sequelize.STRING,
    },
    iduser: {
      type: Sequelize.STRING,
    },
    etat: {
      type: Sequelize.STRING,
    },
  })
  return Fournisseur
}
