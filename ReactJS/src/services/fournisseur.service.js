import http from '../http-common'
class FournisseurDataService {
  getAll() {
    return http.get('/fournisseurs/')
  }
  get(id) {
    return http.get(`/fournisseurs/${id}`)
  }
  create(data) {
    return http.post('/fournisseurs', data)
  }
  update(id, data) {
    return http.put(`/fournisseurs/${id}`, data)
  }
  valider(id, data) {
    return http.put(`/fournisseurs/valider/${id}`, data)
  }
  delete(id) {
    return http.delete(`/fournisseurs/${id}`)
  }
  deleteAll() {
    return http.delete(`/fournisseurs`)
  }
  findByTitre(titre) {
    return http.get(`/fournisseurs?titre=${titre}`)
  }
  transition(id, etat) {
    return http.put(`/fournisseurs/transition/${id}/${etat}`)
  }
}
export default new FournisseurDataService()
