import React, { useState } from "react";
import { useSelector } from "react-redux";

import repasService from "../../services/repa.service";

import { Row, Col, Card, Button, notification } from "antd";

import { useEffect } from "react";

const AddRepa = () => {
  const { user: currentUser } = useSelector((state) => state.auth)

  // useEffect(() => {
  //   document.title = "Pharmachain - Ajouter rayon";
  // }, []);

  const initialRState = {
    id: null,
    titre:	"",
    description	:"",
    recette:	"",
    ingrediant	:"",
    prix:	0,
    origine	:"",
    iduser:	currentUser.id
  };
  const [repa, setRepa] = useState(initialRState);

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRepa({ ...repa, [name]: value });
  };

  const saverepa = () => {
    repasService
      .create(repa)
      .then((response) => {
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newrepa = () => {
    setRepa(initialRState);
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
                  onClick={newrepa}
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
                    value={repa.titre}
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
                    value={repa.description}
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
                    value={repa.prix}
                    onChange={handleInputChange}
                    name="prix"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="recette">
                    <h6
                      style={{
                        color: "#222",
                        fontWeight: "bolder",
                        margin: 5,
                      }}
                    >
                      recette
                    </h6>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recette"
                    required
                    value={repa.recette}
                    onChange={handleInputChange}
                    name="recette"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ingrediant">
                    <h6
                      style={{
                        color: "#222",
                        fontWeight: "bolder",
                        margin: 5,
                      }}
                    >
                      ingrediant
                    </h6>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ingrediant"
                    required
                    value={repa.ingrediant}
                    onChange={handleInputChange}
                    name="ingrediant"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="origine">
                    <h6
                      style={{
                        color: "#222",
                        fontWeight: "bolder",
                        margin: 5,
                      }}
                    >
                      origine
                    </h6>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="origine"
                    required
                    value={repa.origine}
                    onChange={handleInputChange}
                    name="origine"
                  />
                </div>

                <Button
                  type="primary"
                  block
                  onClick={saverepa}
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
export default AddRepa;
