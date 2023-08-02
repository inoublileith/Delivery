import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";

import evenementService from "../../services/evenement.service";


const EditEvenement = (props) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   document.title = "Pharmachain - Edit rayon";
  // }, []);

  let { id } = useParams();
  const initialEventState = {
    id: null,
    libelle: "",
    lieu: "",
    description: "",
    prix: "",
    nombre_de_places: '',
    date_debut: '',
    date_fin: '',
  };
  const [currentEvent, setCurrentEvent] = useState(initialEventState);

  const getevent = (id) => {
    evenementService
      .get(id)
      .then((response) => {
        setCurrentEvent(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getevent(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentEvent({ ...currentEvent, [name]: value });
    console.log(currentEvent)
  };

  const updateevent = () => {
    evenementService
      .update(currentEvent.id, currentEvent)
      .then((response) => {
        notification.info({
          message: `Alert`,
          description: "mis à jour avec succès !",
          placement: "bottomRight",
          duration: 1.5,
        });
        navigate("/evenements/");
      })
      .catch((e) => {
        console.log(e);
        notification.info({
          message: `Alert`,
          description: "Erreur !",
          placement: "bottomRight",
          duration: 1.5,
        });
      });
  };

  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={true}
            className="criclebox tablespace mb-24"
            title="Edit produit"
          >
            {currentEvent ? (
              <div
                className="edit-form"
                style={{
                  paddingLeft: 50,
                  paddingRight: 50,
                  paddingTop: 20,
                  paddingBottom: 20,
                }}
              >
                <form>
                  <div className="form-group">
                    <label htmlFor="libelle">
                      <h6
                        style={{
                          color: "#222",
                          fontWeight: "bolder",
                          margin: 5,
                        }}
                      >
                        libelle :
                      </h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="libelle"
                      value={currentEvent.libelle}
                      onChange={handleInputChange}
                      name="libelle"
                      style={{ marginBottom: 10 }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lieu">
                      <h6
                        style={{
                          color: "#222",
                          fontWeight: "bolder",
                          margin: 5,
                        }}
                      >
                        lieu :
                      </h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lieu"
                      value={currentEvent.lieu}
                      onChange={handleInputChange}
                      name="lieu"
                      style={{ marginBottom: 10 }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">
                      <h6
                        style={{
                          color: "#222",
                          fontWeight: "bolder",
                          margin: 5,
                        }}
                      >
                        description :
                      </h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      required
                      value={currentEvent.description}
                      onChange={handleInputChange}
                      name="description"
                      style={{ marginBottom: 10 }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="prix">
                      <h6
                        style={{
                          color: "#222",
                          fontWeight: "bolder",
                          margin: 5,
                        }}
                      >
                        prix :
                      </h6>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="prix"
                      required
                      value={currentEvent.prix}
                      onChange={handleInputChange}
                      name="prix"
                      style={{ marginBottom: 10 }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="nombre_de_places">
                      <h6
                        style={{
                          color: "#222",
                          fontWeight: "bolder",
                          margin: 5,
                        }}
                      >
                        nombre_de_places :
                      </h6>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="nombre_de_places"
                      required
                      value={currentEvent.nombre_de_places}
                      onChange={handleInputChange}
                      name="nombre_de_places"
                      style={{ marginBottom: 10 }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="date_debut">
                      <h6
                        style={{
                          color: "#222",
                          fontWeight: "bolder",
                          margin: 5,
                        }}
                      >
                        date_debut :
                      </h6>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="date_debut"
                      required
                      value={currentEvent.date_debut}
                      onChange={handleInputChange}
                      name="date_debut"
                      style={{ marginBottom: 10 }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="date_fin">
                      <h6
                        style={{
                          color: "#222",
                          fontWeight: "bolder",
                          margin: 5,
                        }}
                      >
                        date_fin :
                      </h6>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="code_promo"
                      required
                      value={currentEvent.date_fin}
                      onChange={handleInputChange}
                      name="date_fin"
                      style={{ marginBottom: 10 }}
                    />
                  </div>

                  <Button
                    type="primary"
                    block
                    onClick={updateevent}
                    style={{ marginTop: 20 }}
                  >
                    Modifier
                  </Button>
                </form>
              </div>
            ) : (
              <div>
                <br />
                <p>Error</p>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default EditEvenement;
