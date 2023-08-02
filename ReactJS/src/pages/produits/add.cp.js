import React, { useState } from "react";
import { useSelector } from "react-redux";
import produitService from "../../services/produit.service";

import { Row, Col, Card, Button, notification } from "antd";

import { useEffect } from "react";

const AddProduit = () => {
  const { user: currentUser } = useSelector((state) => state.auth)

  // useEffect(() => {
  //   document.title = "Pharmachain - Ajouter rayon";
  // }, []);

  const initialPState = {
    id: null,
    titre: "",
    description: "",
    prix: "",
    quantite: 0,
    promotion: 0,
    remise: 0,
    code_promo: "",
    etat: null,
    iduser: currentUser.id,
  };
  const [produit, setProduit] = useState(initialPState);

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduit({ ...produit, [name]: value });
  };

  const saveProduit = () => {
    produitService
      .create(produit)
      .then((response) => {
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newProduit = () => {
    setProduit(initialPState);
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
                  onClick={newProduit}
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
                  <label htmlFor="titre">
                    <h6
                      style={{
                        color: "#222",
                        fontWeight: "bolder",
                        margin: 5,
                      }}
                    >
                      Titre
                    </h6>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="titre"
                    required
                    onChange={handleInputChange}
                    name="titre"
                    aria-describedby="titre"
                    value={produit.titre}
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
                    value={produit.description}
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
                    value={produit.prix}
                    onChange={handleInputChange}
                    name="prix"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quantite">
                    <h6
                      style={{
                        color: "#222",
                        fontWeight: "bolder",
                        margin: 5,
                      }}
                    >
                      quantite
                    </h6>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantite"
                    required
                    value={produit.quantite}
                    onChange={handleInputChange}
                    name="quantite"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="promotion">
                    <h6
                      style={{
                        color: "#222",
                        fontWeight: "bolder",
                        margin: 5,
                      }}
                    >
                      promotion
                    </h6>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="promotion"
                    required
                    value={produit.promotion}
                    onChange={handleInputChange}
                    name="promotion"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="remise">
                    <h6
                      style={{
                        color: "#222",
                        fontWeight: "bolder",
                        margin: 5,
                      }}
                    >
                      remise
                    </h6>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="remise"
                    required
                    value={produit.remise}
                    onChange={handleInputChange}
                    name="remise"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="code_promo">
                    <h6
                      style={{
                        color: "#222",
                        fontWeight: "bolder",
                        margin: 5,
                      }}
                    >
                      code_promo
                    </h6>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="code_promo"
                    required
                    value={produit.code_promo}
                    onChange={handleInputChange}
                    name="code_promo"
                  />
                </div>

                <Button
                  type="primary"
                  block
                  onClick={saveProduit}
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
export default AddProduit;
