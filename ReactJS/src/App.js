import { Routes, Route } from "react-router-dom";

import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import Dashboard from "./pages/Dashboard";

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

import ShowDeclarations from "./pages/declaration/list.cp";

import ShowFournisseurs from "./pages/fournisseur/list.cp";

import ShowEvent from "./pages/evenements/list.cp";
import AddEvent from "./pages/evenements/add.cp";
import EditEvent from "./pages/evenements/edit.cp";

import ShowRepas from "./pages/repas/list.cp";
import AddRepa from "./pages/repas/add.cp";
import EditRepa from "./pages/repas/edit.cp";

import ShowProduits from "./pages/produits/list.cp";
import AddProduits from "./pages/produits/add.cp";
import EditProduits from "./pages/produits/edit.cp";

import ShowCommandes from "./pages/commandes/list.cp";

import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log(currentUser)
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  return (
    <div className="App">
      {currentUser ? (
        <Main currentUser={currentUser}>
          <Routes>
            <Route exact path="/dashboard" element={<Dashboard />} />

            {/* //// fournisseur */}
            <Route exact path="/fournisseurs" element={<ShowFournisseurs />} />

            {/* //// declaration */}
            <Route exact path="/declarations" element={<ShowDeclarations />} />

            <Route exact path="/commandes" element={<ShowCommandes />} />

            {/* //// produit */}
            <Route exact path="/produits" element={<ShowProduits />} />
            <Route exact path="/addProduit" element={<AddProduits />} />
            <Route path="/editProduit/:id" element={<EditProduits />} />
            {/* //// repas */}
            <Route exact path="/repas" element={<ShowRepas />} />
            <Route exact path="/addRepa" element={<AddRepa />} />
            <Route path="/editRepa/:id" element={<EditRepa />} />
            {/* //// event */}
            <Route exact path="/evenements" element={<ShowEvent />} />
            <Route exact path="/addEvenement" element={<AddEvent />} />
            <Route path="/editEvenement/:id" element={<EditEvent />} />

            {/* //// profile */}
            <Route exact path="/profile" element={<Profile />} />
          </Routes>
        </Main>
      ) : (
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/sign-up" element={<SignUp />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
