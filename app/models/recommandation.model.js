module.exports = (sequelize, Sequelize) => {
  const Recommandation = sequelize.define('recommandation', {
    nom: {
      type: Sequelize.STRING,
    },
    prenom: {
      type: Sequelize.STRING,
    },
    tel: {
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
    },
    login: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    profil: {
      type: Sequelize.INTEGER,
    },
    permissions: {
      type: Sequelize.INTEGER,
    },
    etat: {
      type: Sequelize.INTEGER,
    },

  })
  return Recommandation
}
