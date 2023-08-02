const express = require('express') //pour exploiter les donner (express esm biblio)
const cors = require('cors')
const app = express()
var corsOptions = {
  origin: 'http://localhost:9999',
}
//use configuration generle lel app
app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to INFOESPRIT WORLD.' })
})

const db = require('./app/models')
const Role = db.role
db.sequelize.sync().then(() => {
  console.log('Resync Db ...')
  //initial()
})
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Db')
//   initial()
// })
function initial() {
  Role.create({
    id: 1,
    name: 'admin',
  })

  Role.create({
    id: 2,
    name: 'fournisseurpro',
  })

  Role.create({
    id: 3,
    name: 'fournisseurrep',
  })

  Role.create({
    id: 4,
    name: 'client',
  })

  Role.create({
    id: 5,
    name: 'user',
  })
}

//////////////////
const authRouter = require('./app/routes/auth.routes')
authRouter(app)

const utilisateurRouter = require('./app/routes/utilisateur.routes')
utilisateurRouter(app)

const produitRouter = require('./app/routes/produit.routes')
produitRouter(app)

const clientRouter = require('./app/routes/client.routes')
clientRouter(app)

const fournisseurRouter = require('./app/routes/fournisseur.routes')
fournisseurRouter(app)

const panierRouter = require('./app/routes/panier.routes')
panierRouter(app)

const adminRouter = require('./app/routes/admin.routes')
adminRouter(app)

const repaRouter = require('./app/routes/repa.routes')
repaRouter(app)

const evenementRouter = require('./app/routes/evenement.routes')
evenementRouter(app)

const livraisonRouter = require('./app/routes/livraison.routes')
livraisonRouter(app)

const avisRouter = require('./app/routes/avis.routes')
avisRouter(app)

const participationRouter = require('./app/routes/participation.routes')
participationRouter(app)

const decRouter = require('./app/routes/declaration.routes')
decRouter(app)

// set port, listen for requests
const PORT = process.env.PORT || 8088
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
  // initial()
})
