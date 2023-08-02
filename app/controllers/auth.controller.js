/*
- signup: create new User in database (role is user if not specifying role)
- signin:

      ->find username of the request in database, if it exists
      ->compare password with password in database using bcrypt, if it is correct
      ->generate a token using jsonwebtoken
      ->return user information & access Token
*/
const db = require("../models");
const config = require("../config/auth.config");
const User = db.utilisateur;
const Role = db.role;
const RefreshToken = db.refreshToken;
//const { user: User, role: Role, refreshToken: RefreshToken } = db
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    nom: req.body.nom,
    prenom: req.body.prenom,
    tel: req.body.tel,
    email: req.body.email,
    login: req.body.login,
    password: bcrypt.hashSync(req.body.password, 8),
    roles: req.body.roles,
    etat: "1",
    profil: req.body.profil
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 5
        user.setRoles([5]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      login: req.body.login,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });

      let refreshToken = await RefreshToken.createToken(user);
      let permissions = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          permissions.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.login,
          email: user.email,
          password: user.password,
          roles: permissions,
          etat: user.etat,
          accessToken: token,
          refreshToken: refreshToken,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }
  try {
    let refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    });
    console.log(refreshToken);
    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }
    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
/*
In refreshToken() function:

-> Firstly, we get the Refresh Token from request data
-> Next, get the RefreshToken object {id, user, token, expiryDate} from raw Token using RefreshToken model static method
-> We verify the token (expired or not) basing on expiryDate field. If the Refresh Token was expired, remove it from database and return message
-> Continue to use user id field of RefreshToken object as parameter to generate new Access Token using jsonwebtoken library
-> Return { new accessToken, refreshToken } if everything is done
-> Or else, send error message
*/
