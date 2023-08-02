import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";

import repasService from "../../services/repa.service";

const EditRepa = (props) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   document.title = "Pharmachain - Edit rayon";
  // }, []);

  let { id } = useParams();
  const initialRState = {
    id:	null,
    titre	:"",
    description	:"",
    recette:	"",
    ingrediant:	"",
    prix:	0,
    origine	:"",
  };
  const [currentRepa, setCurrentRepa] = useState(initialRState);

  const getrepa = (id) => {
    repasService.get(id)
      .then((response) => {
        setCurrentRepa(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getrepa(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentRepa({ ...currentRepa, [name]: value });
  };

  const updaterepa = () => {
    repasService.update(currentRepa.id, currentRepa)

      .then((response) => {
        notification.info({
          message: `Alert`,
          description: "mis à jour avec succès !",
          placement: "bottomRight",
          duration: 1.5,
        });
        navigate("/repas/");
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
            {currentRepa ? (
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
                      value={currentRepa.titre}
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
                      value={currentRepa.description}
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
                      value={currentRepa.prix}
                      onChange={handleInputChange}
                      name="prix"
                      style={{ marginBottom: 10 }}
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
                        recette :
                      </h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recette"
                      required
                      value={currentRepa.recette}
                      onChange={handleInputChange}
                      name="recette"
                      style={{ marginBottom: 10 }}
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
                        ingrediant :
                      </h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ingrediant"
                      required
                      value={currentRepa.ingrediant}
                      onChange={handleInputChange}
                      name="ingrediant"
                      style={{ marginBottom: 10 }}
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
                        origine :
                      </h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="origine"
                      required
                      value={currentRepa.origine}
                      onChange={handleInputChange}
                      name="origine"
                      style={{ marginBottom: 10 }}
                    />
                  </div>

                  
                  <Button
                    type="primary"
                    block
                    onClick={updaterepa}
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
export default EditRepa;
