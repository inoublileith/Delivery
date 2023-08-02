import http from '../http-common'
class DeclarationDataService {
  getAll() {
    return http.get('/declarations/')
  }
  get(id) {
    return http.get(`/declarations/${id}`)
  }
  create(data) {
    return http.post('/declarations', data)
  }
  update(id, data) {
    return http.put(`/declarations/${id}`, data)
  }
  delete(id) {
    return http.delete(`/declarations/${id}`)
  }
  deleteAll() {
    return http.delete(`/declarations`)
  }
  findByDescription(description) {
    return http.get(`/declarations?description=${description}`)
  }
  transition(id, etat) {
    return http.put(`/declarations/transition/${id}/${etat}`)
  }
}
export default new DeclarationDataService()
