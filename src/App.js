import React from 'react';
import Footer from './Components/Footer';
import Header from './Components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/Login';
import { FirebaseProvider } from './Contexts/Firebase';
import RegisterPage from './Pages/Register';
import ForgotPass from './Pages/ForgotPass';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <FirebaseProvider> 
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/login' element={<LoginPage />}></Route>
          <Route exact path='/register' element={<RegisterPage />}></Route>
          <Route exact path='/forgot' element={<ForgotPass />}></Route>
        </Routes>
      </div>
      <Footer />
      </FirebaseProvider>
    </div>
  );
}

export default App;
