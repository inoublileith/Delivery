import http from '../http-common'
class EvenementDataService {
  getAll(id) {
    return http.get(`/evenements?iduser=${id}`)
  }
  get(id) {
    return http.get(`/evenements/${id}`)
  }
  create(data) {
    return http.post('/evenements', data)
  }
  update(id, data) {
    return http.put(`/evenements/${id}`, data)
  }
  delete(id) {
    return http.delete(`/evenements/${id}`)
  }
  deleteAll() {
    return http.delete(`/evenements`)
  }
  findByTitre(titre) {
    return http.get(`/evenements?titre=${titre}`)
  }
  transition(id, etat) {
    return http.put(`/evenements/transition/${id}/${etat}`)
  }
}
export default new EvenementDataService()
