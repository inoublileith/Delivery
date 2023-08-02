import http from '../http-common'
class RepaDataService {
  getAll(id) {
    return http.get(`/repas?iduser=${id}`)
  }
  get(id) {
    return http.get(`/repas/${id}`)
  }
  create(data) {
    return http.post('/repas', data)
  }
  update(id, data) {
    return http.put(`/repas/${id}`, data)
  }
  delete(id) {
    return http.delete(`/repas/${id}`)
  }
  deleteAll() {
    return http.delete(`/repas`)
  }
  findByTitre(titre) {
    return http.get(`/repas?titre=${titre}`)
  }
  transition(id, etat) {
    return http.put(`/repas/transition/${id}/${etat}`)
  }
}
export default new RepaDataService()
