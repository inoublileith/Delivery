import React from "react";
import { Link } from "react-router-dom";
import { Layout, Button, Switch, Card, Typography } from "antd";

import Divider from "@mui/material/Divider";
import logo from "../assets/images/td.png";
import FullHeight from "react-full-height";
import logo1 from "../assets/images/logos-facebook.svg";
import logo3 from "../assets/images/Google__G__Logo.svg.png";

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { loginFunc } from "../actions/auth";

function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Content } = Layout;

const required = (value) => {
  if (!value) {
    return (
      <div
        role="alert"
        style={{
          color: "red",
          textAlign: "left",
          marginTop: 0,
          marginBottom: 5,
          marginLeft: 10,
        }}
      >
        * Ce champ est obligatoire!
      </div>
    );
  }
};

const SignIn = (props) => {
  const navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const [login, setlogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Tunisian Delivery - Se connecter";
  }, []);

  const onChangelogin = (e) => {
    const login = e.target.value;
    setlogin(login);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(loginFunc(login, password))
        .then(() => {
          props.history.push("/profile");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };
  if (isLoggedIn) {
    return navigate("/profile");
  }

  const { Title } = Typography

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
                  <div>
                    <img
                      src={logo}
                      style={{ height: 80, marginTop: 20, margin: 5 }}
                    />
                    <Title level={4} >Tunisian Delivery</Title>
                    <h2
                      style={{
                        color: "#222",
                        fontWeight: "bolder",
                        marginBottom: 5,
                        marginTop: 10,
                      }}
                    >
                      Se connecter
                    </h2>
                  </div>
                  <Divider component="Form" style={{ marginTop: 15 }} />

                  <Form onSubmit={handleLogin} ref={form}>
                    
                    <div className="form-group">
                      {/* <label
                    htmlFor="login"
                    style={{
                      fontSize: 15,
                      fontWeight: "bolder",
                      margin: 5,
                      color: "#333",
                    }}
                  >
                    Nom d'utilisateur :
                  </label> */}
                      <Input
                        placeholder="Nom d'utilisateur"
                        type="text"
                        className="form-control"
                        name="login"
                        value={login}
                        onChange={onChangelogin}
                        validations={[required]}
                        style={{ marginTop: 25, color: "#111" }}
                      />
                    </div>
                    <div className="form-group">
                      {/* <label
                    htmlFor="password"
                    style={{
                      fontSize: 15,
                      fontWeight: "bolder",
                      margin: 5,
                      color: "#333",
                    }}
                  >
                    Mot de passe :
                  </label> */}
                      <Input
                        placeholder="Mot de passe"
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required]}
                        style={{
                          marginTop: 15,
                          color: "#111",
                          marginBottom: 15,
                        }}
                      />
                    </div>
                    {/* <div style={{ width: "100%" }}>
                      <Switch
                        defaultChecked
                        onChange={onChange}
                        style={{
                          marginLeft: -150,
                          marginTop: 15,
                          marginBottom: 15,
                          marginRight: 10,
                          color: "#111",
                        }}
                      />
                      <a style={{ color: "#111" }}>Ne pas m'oublier</a>
                    </div> */}
                    <div className="form-group">
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
                        <span>Connexion</span>
                      </button>
                      <div className="signinDiv">
                        <p
                          className="font-semibold text-muted"
                          style={{ marginTop: 10 }}
                        >
                          Vous n'avez pas un compte?{" "}
                          <Link to="/sign-up" className="text-dark font-bold">
                            Inscrivez-vous!
                          </Link>
                        </p>
                      </div>
                    </div>
                    {message && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                          {message}
                        </div>
                      </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                  </Form>
                </Card>
              </div>
            </div>
          </FullHeight>
        </Content>

        {/* <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 10, offset: -2 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="" />
            </Col> */}
      </div>
    </>
  );
};

export default SignIn;
