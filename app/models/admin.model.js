module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define('admin', {
    nom_application: {
      type: Sequelize.STRING,
    },
    URL: {
      type: Sequelize.STRING,
    },

    provider: {
      type: Sequelize.STRING,
    },
    provider_SGBD: {
      type: Sequelize.STRING,
    },
    date_publication: {
      type: Sequelize.INTEGER,
    },
    date_last_update: {
      type: Sequelize.INTEGER,
    },
  })
  return Admin
}
