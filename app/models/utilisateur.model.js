module.exports = (sequelize, Sequelize) => {
  const Utilisateur = sequelize.define('utilisateur', {
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
    gouvernorat: {
      type: Sequelize.STRING,
    },
    delegation: {
      type: Sequelize.STRING,
    },
    adress: {
      type: Sequelize.STRING,
    },
    code_postal: {
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
    avatar: {
      type: Sequelize.STRING,
    },
    token_ID: {
      type: Sequelize.INTEGER,
    },
    adress_wallet: {
      type: Sequelize.STRING,
    },
    token_std: {
      type: Sequelize.STRING,
    },
    etat: {
      type: Sequelize.INTEGER,
    },
  })
  //
  //fs
  //
  return Utilisateur
}
