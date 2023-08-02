import { Layout, Button, Card, Checkbox, Typography } from "antd";

import logo from "../assets/images/td.png";

import FullHeight from "react-full-height";

import Divider from "@mui/material/Divider";

import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from "react-router-dom";

import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { register } from "../actions/auth";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

const { Content } = Layout;

const required = (value) => {
  if (!value) {
    return (
      <div
        role="alert"
        style={{
          color: "red",
          textAlign: "left",
          marginTop: -8,
          marginBottom: 5,
          marginLeft: 10,
        }}
      >
        * Ce champ est obligatoire!
      </div>
    );
  }
};
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div
        role="alert"
        style={{
          color: "red",
          textAlign: "left",
          marginTop: -8,
          marginBottom: 5,
          marginLeft: 10,
        }}
      >
        * This is not a valid email.
      </div>
    );
  }
};
const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div
        role="alert"
        style={{
          color: "red",
          textAlign: "left",
          marginTop: -8,
          marginBottom: 5,
          marginLeft: 10,
        }}
      >
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div
        role="alert"
        style={{
          color: "red",
          textAlign: "left",
          marginTop: -8,
          marginBottom: 5,
          marginLeft: 10,
        }}
      >
        * The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const SignUp = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const profil = "2";
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    document.title = "Tunisian Delivery - S'inscrire";
  }, []);

  const onChangeNom = (e) => {
    const nom = e.target.value;
    setNom(nom);
  };

  const onChangePrenom = (e) => {
    const prenom = e.target.value;
    setPrenom(prenom);
  };

  const onChangeLogin = (e) => {
    const login = e.target.value;
    setLogin(login);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeRole = (e) => {
    const role = e.target.value;
    setRoles([role]);
    console.log(roles);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      console.log(login, email, password, roles, nom, prenom, profil);
      dispatch(register(login, email, password, roles, nom, prenom, profil))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const { Title } = Typography;

  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Content className="p-0">
          <FullHeight>
            <div className="sign-up-header">
              <div className="content">
                <Card
                  className="card-signup header-solid h-full ant-card pt-0"
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 0,
                    flexDirection: "column",
                  }}
                  bordered="false"
                >
                  <div style={{ width: 350 }}>
                    <img
                      alt="logo"
                      src={logo}
                      style={{ height: 80, marginTop: 15 }}
                    />
                    <Title level={4}>Tunisian Delivery</Title>
                    <h2
                      style={{
                        color: "#222",
                        fontWeight: "bolder",
                        marginBottom: 20,
                      }}
                    >
                      S'inscrire
                    </h2>
                  </div>
                  <Divider component="Form" />

                  <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                      <>
                        <Input
                          placeholder="Nom"
                          type="text"
                          className="form-control"
                          name="nom"
                          value={nom}
                          onChange={onChangeNom}
                          validations={[required]}
                          style={{
                            marginBottom: 13,
                            color: "#111",
                            marginTop: 20,
                          }}
                        />
                        <Input
                          placeholder="Prénom"
                          type="text"
                          className="form-control"
                          name="prenom"
                          value={prenom}
                          onChange={onChangePrenom}
                          validations={[required]}
                          style={{
                            marginBottom: 13,
                            color: "#111",
                          }}
                        />
                        <Input
                          placeholder="Nom d'utilisateur"
                          type="text"
                          className="form-control"
                          name="login"
                          value={login}
                          onChange={onChangeLogin}
                          validations={[required, vusername]}
                          style={{
                            marginBottom: 13,
                            color: "#111",
                          }}
                        />

                        <Input
                          placeholder="E-mail"
                          type="text"
                          className="form-control"
                          name="email"
                          value={email}
                          onChange={onChangeEmail}
                          validations={[required, validEmail]}
                          style={{ marginBottom: 13, color: "#111" }}
                        />

                        <Input
                          placeholder="Mot de passe"
                          type="password"
                          className="form-control"
                          name="password"
                          value={password}
                          onChange={onChangePassword}
                          validations={[required, vpassword]}
                          style={{ marginBottom: 15, color: "#111" }}
                        />
                        {/* <div style={{ textAlign: "left", marginBottom: 15 }}>
                            <Checkbox>
                              <div style={{ color: "#111" }}>
                                J'accepte les{" "}
                                <a className="font-bold text-dark">
                                  Conditions générales
                                </a>
                              </div>
                            </Checkbox>
                          </div> */}

                        <select
                          onChange={onChangeRole}
                          style={{
                            color: "#111",
                            marginBottom: 12,
                            padding: 5,
                          }}
                          defaultValue="fournisseurpro"
                        >
                          <option
                            value="fournisseurpro"
                            style={{ color: "#111" }}
                          >
                            Fournisseur produits
                          </option>
                          <option
                            value="fournisseurrep"
                            style={{ color: "#111" }}
                          >
                            Fournisseur repâs
                          </option>
                        </select>

                        <button
                          className="btn btn-primary btn-block"
                          disabled={loading}
                          style={{ width: "100%" }}
                        >
                          {loading && (
                            <span
                              className="spinner-border spinner-border-sm"
                              style={{ marginRight: 10 }}
                            ></span>
                          )}
                          <span>Inscription</span>
                        </button>
                        {/* </div> */}
                      </>
                    )}
                    {message && (
                      <div className="form-group">
                        <div
                          className={
                            successful
                              ? "alert alert-success"
                              : "alert alert-danger"
                          }
                          role="alert"
                        >
                          {message}
                        </div>
                      </div>
                    )}
                    <p
                      className="font-semibold text-muted text-center"
                      style={{ marginTop: 10 }}
                    >
                      Vous avez un compte?{" "}
                      <Link to="/" className="font-bold text-dark">
                        Connectez-vous!
                      </Link>
                    </p>
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                  </Form>
                </Card>
              </div>
            </div>
          </FullHeight>
        </Content>
      </div>
    </>
  );
};
export default SignUp;
