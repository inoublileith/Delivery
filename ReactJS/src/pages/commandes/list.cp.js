import { Row, Col, Card, Table, Button, Typography } from "antd";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Popconfirm } from "antd";

import { QuestionCircleOutlined } from "@ant-design/icons";
import panierService from "../../services/panier.service";
import { useSelector } from "react-redux";

function ShowLivraisons() {
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log(currentUser);

  const [showFournisseurPBoard, setShowFournisseurPBoard] = useState(false);
  const [showFournisseurRBoard, setShowFournisseurRBoard] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setShowFournisseurPBoard(
        currentUser.roles.includes("ROLE_FOURNISSEURPRO")
      );
      setShowFournisseurRBoard(
        currentUser.roles.includes("ROLE_FOURNISSEURREP")
      );
    }
  }, [currentUser]);

  const [livraisonsP, setLivraisonsP] = useState([]);
  const [livraisonsR, setLivraisonsR] = useState([]);

  const retrieveLiv = () => {
    panierService
      .findAllLc(currentUser.id)
      .then((response) => {
        setLivraisonsP(response.data.dp);
        setLivraisonsR(response.data.dr);
        console.log("repas", response.data.dr);
        console.log("produits", response.data.dp);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    retrieveLiv();
  }, []);

  const columns = [
    {
      title: "titre",
      dataIndex: "titre",
      key: "titre",
      ellipsis: true,
    },
    {
      title: "prix",
      dataIndex: "prix",
      key: "prix",
      ellipsis: true,
    },
    {
      title: "quantite",
      dataIndex: "quantite",
      key: "quantite",
      ellipsis: true,
    },
    {
      title: "etat",
      key: "etat",
      dataIndex: "etat",
      ellipsis: true,
      render: (_, record) =>
        record.etat == 1 ? (
          <>
            <h6>Livrée</h6>
          </>
        ) : (
          <>
            <h6>En attente</h6>
          </>
        ),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 245,

      render: (_, record) => (
        <>
          <Popconfirm
            title="Voulez-vous vraiment livrer cet enregistrement?"
            okText="Oui"
            cancelText="Non"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => validerLiv(record.idligne)}
          >
            <Button
              type="primary"
              className="tag-secondary"
              style={{ width: 110, marginLeft: 10 }}
            >
              Livrer
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const [loading, setLoading] = useState(true);

  const validerLiv = (id) => {
    panierService
      .livrer(id)
      .then(() => {
        retrieveLiv();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const { Title } = Typography;

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={true}
              className="criclebox tablespace mb-24"
              title="Commandes"
            >
              <div
                className="table-responsive"
                style={{ paddingLeft: 20, paddingRight: 20 }}
              >
                {showFournisseurRBoard && (
                  <>
                    <Title level={5} style={{ margin: 15 }}>
                      Repas :
                    </Title>
                    <Table
                      bordered={true}
                      loading={loading}
                      scroll={{ x: 1500 }}
                      size="small"
                      pagination={true}
                      columns={columns}
                      dataSource={livraisonsR}
                      className="ant-border-space"
                    />
                  </>
                )}

                {showFournisseurPBoard && (
                  <>
                    <Title level={5} style={{ margin: 15 }}>
                      Produits :
                    </Title>
                    <Table
                      bordered={true}
                      loading={loading}
                      scroll={{ x: 1500 }}
                      size="small"
                      pagination={true}
                      columns={columns}
                      dataSource={livraisonsP}
                      className="ant-border-space"
                    />
                  </>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ShowLivraisons;
