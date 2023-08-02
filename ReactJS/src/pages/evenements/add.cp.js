import React, { useState } from "react";
import { useSelector } from "react-redux";

import evenementService from "../../services/evenement.service";

import { Row, Col, Card, Button, notification } from "antd";

import { useEffect } from "react";

const AddEvenement = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   document.title = "Pharmachain - Ajouter rayon";
  // }, []);

  const initialEventState = {
    id: null,
    libelle: "",
    lieu: "",
    description: "",
    prix: "",
    nombre_de_places: null,
    date_debut: null,
    date_fin: null,
    iduser: currentUser.id,
  };
  const [evenement, setEvenement] = useState(initialEventState);

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEvenement({ ...evenement, [name]: value });
  };

  const saveevent = () => {
    evenementService
      .create(evenement)
      .then((response) => {
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newevent = () => {
    setEvenement(initialEventState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={true}
            className="criclebox tablespace mb-24"
            title="Rayons"
          >
            {submitted ? (
              <div style={{ padding: 30 }}>
                <h4>You submitted successfully!</h4>
                <Button
                  type="primary"
                  block
                  onClick={newevent}
                  style={{ marginTop: 20 }}
                >
                  Ajouter de nouveau!
                </Button>
              </div>
            ) : (
              <div
                style={{
                  paddingLeft: 50,
                  paddingRight: 50,
                  paddingTop: 20,
                  paddingBottom: 20,
                }}
                className="edit-form"
              >
                <div className="form-group">
                  <label htmlFor="libelle">
                    <h6
                      style={{
                        color: "#222",
                        fontWeight: "bolder",
                        margin: 5,
                      }}
                    >
                      libelle
                    </h6>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="libelle"
                    required
                    onChange={handleInputChange}
                    name="libelle"
                    aria-describedby="libelle"
                    value={evenement.libelle}
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
                      Description
                    </h6>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    required
                    value={evenement.description}
                    onChange={handleInputChange}
                    name="description"
                    aria-describedby="description"
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
                      prix
                    </h6>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="prix"
                    required
                    value={evenement.prix}
                    onChange={handleInputChange}
                    name="prix"
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
                      lieu
                    </h6>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lieu"
                    required
                    value={evenement.lieu}
                    onChange={handleInputChange}
                    name="lieu"
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
                      nombre_de_places
                    </h6>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="nombre_de_places"
                    required
                    value={evenement.nombre_de_places}
                    onChange={handleInputChange}
                    name="nombre_de_places"
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
                      date_debut
                    </h6>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date_debut"
                    required
                    value={evenement.date_debut}
                    onChange={handleInputChange}
                    name="date_debut"
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
                      date_fin
                    </h6>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date_fin"
                    required
                    value={evenement.date_fin}
                    onChange={handleInputChange}
                    name="date_fin"
                  />
                </div>

                <Button
                  type="primary"
                  block
                  onClick={saveevent}
                  style={{ marginTop: 20 }}
                >
                  Enregistrer
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default AddEvenement;
