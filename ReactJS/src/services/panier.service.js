import http from "../http-common";
class PanierDataService {
  getAll() {
    return http.get("/paniers/");
  }
  get(id) {
    return http.get(`/paniers/${id}`);
  }
  create(data) {
    return http.post("/paniers", data);
  }
  update(id, data) {
    return http.put(`/paniers/${id}`, data);
  }
  delete(id) {
    return http.delete(`/paniers/${id}`);
  }
  deleteAll() {
    return http.delete(`/paniers`);
  }

  //////////////////////////////

  findPanier(id) {
    return http.get(`/paniers/current/${id}`);
  }
  createLc(data) {
    return http.post(`/paniers/addlc/`, data);
  }
  findAllLc(id) {
    return http.get(`/paniers/alllc/${id}`);
  }
  getlp(id) {
    return http.get(`/paniers/getlp/${id}`);
  }
  getlr(id) {
    return http.get(`/paniers/getlr/${id}`);
  }
  deleteLc(id) {
    return http.delete(`/paniers/deletelc/${id}`);
  }
  deletealllc(id) {
    return http.delete(`/paniers/deletealllc/${id}`);
  }
  livrer(id) {
    return http.put(`/paniers/livrer/${id}`);
  }
}
export default new PanierDataService();
