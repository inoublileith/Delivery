import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";

import produitService from "../../services/produit.service";

const EditProduit = (props) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   document.title = "Pharmachain - Edit rayon";
  // }, []);

  let { id } = useParams();
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
    iduser: null,
  };
  const [currentProduit, setCurrentProduit] = useState(initialPState);

  const getproduit = (id) => {
    produitService.get(id)
      .then((response) => {
        setCurrentProduit(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getproduit(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentProduit({ ...currentProduit, [name]: value });
  };

  const updateProduit = () => {
    produitService.update(currentProduit.id, currentProduit)

      .then((response) => {
        notification.info({
          message: `Alert`,
          description: "mis à jour avec succès !",
          placement: "bottomRight",
          duration: 1.5,
        });
        navigate("/produits/");
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
            {currentProduit ? (
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
                    <label htmlFor="titre">
                      <h6
                        style={{
                          color: "#222",
                          fontWeight: "bolder",
                          margin: 5,
                        }}
                      >
                        titre :
                      </h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="titre"
                      value={currentProduit.titre}
                      onChange={handleInputChange}
                      name="titre"
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
                        Description :
                      </h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={currentProduit.description}
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
                        Prix :
                      </h6>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="prix"
                      required
                      value={currentProduit.prix}
                      onChange={handleInputChange}
                      name="prix"
                      style={{ marginBottom: 10 }}
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
                        quantite :
                      </h6>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantite"
                      required
                      value={currentProduit.quantite}
                      onChange={handleInputChange}
                      name="quantite"
                      style={{ marginBottom: 10 }}
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
                        promotion :
                      </h6>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="promotion"
                      required
                      value={currentProduit.promotion}
                      onChange={handleInputChange}
                      name="promotion"
                      style={{ marginBottom: 10 }}
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
                        remise :
                      </h6>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="remise"
                      required
                      value={currentProduit.remise}
                      onChange={handleInputChange}
                      name="remise"
                      style={{ marginBottom: 10 }}
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
                        code_promo :
                      </h6>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="code_promo"
                      required
                      value={currentProduit.code_promo}
                      onChange={handleInputChange}
                      name="code_promo"
                      style={{ marginBottom: 10 }}
                    />
                  </div>

                  <Button
                    type="primary"
                    block
                    onClick={updateProduit}
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
export default EditProduit;
