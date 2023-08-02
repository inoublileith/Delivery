import http from '../http-common'
class ProduitDataService {
  getAll(id) {
    return http.get(`/produits?iduser=${id}`)
  }
  get(id) {
    return http.get(`/produits/${id}`)
  }
  create(data) {
    return http.post('/produits', data)
  }
  update(id, data) {
    return http.put(`/produits/${id}`, data)
  }
  delete(id) {
    return http.delete(`/produits/${id}`)
  }
  deleteAll() {
    return http.delete(`/produits`)
  }
  findByTitre(titre) {
    return http.get(`/produits?titre=${titre}`)
  }
  transition(id, etat) {
    return http.put(`/produits/transition/${id}/${etat}`)
  }
}
export default new ProduitDataService()
