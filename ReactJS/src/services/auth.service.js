import http from '../http-common'
const register = (login, email, password, roles, nom, prenom, profil) => {
  return http.post('/auth/signup', {
    login,
    email,
    password,
    roles,
    nom,
    prenom,
    profil
  })
}

const LoginFunc = async (login, password) => {
  const response = await http
    .post('/auth/signin', {
      login,
      password,
    })
  if (response.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const Logout = () => {
  localStorage.removeItem('user')
}

const GetCurrentUser = async (id) => {
  const user = await http.get(`/utilisateurs/${id}`)
  return user
}

export default {
  register,
  LoginFunc,
  Logout,
  GetCurrentUser,
}
