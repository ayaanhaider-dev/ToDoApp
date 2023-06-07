import React from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import { FirebaseProvider } from "./Contexts/Firebase";
import RegisterPage from "./Pages/Register";
import ForgotPass from "./Pages/ForgotPass";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <FirebaseProvider>
        <Header />
        <script
          type="text/javascript"
          src="//pl19652524.highrevenuegate.com/c0/c0/f0/c0c0f05fe4cfa50bfd2f8e4691bf5fcb.js"
        ></script>
        <div className="flex-grow">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<LoginPage />}></Route>
            <Route exact path="/register" element={<RegisterPage />}></Route>
            <Route exact path="/forgot" element={<ForgotPass />}></Route>
          </Routes>
        </div>
        <Footer />
      </FirebaseProvider>
    </div>
  );
}

export default App;
