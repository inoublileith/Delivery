module.exports = (sequelize, Sequelize) => {
  const Avis = sequelize.define('avi', {
    objet: {
      type: Sequelize.STRING,
    },
    note: {
      type: Sequelize.STRING,
    },
    // image: {
    //   type: Sequelize.STRING,
    // },
    commentaire: {
      type: Sequelize.STRING,
    },
  })
  return Avis
}
