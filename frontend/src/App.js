
import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Header from './components/Header';
import Footer from './components/Footer';

import Startup from './components/Startup';
import LoginScreen from './components/LoginScreen';

import RegisterScreen from './components/Register';

import './bootstrap.min.css';


function App() {
  return (
    <Router>

      <Header />

        <main>
               <Container>
                  <Route path='/' component={Startup} exact />
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/singup' component={RegisterScreen} />
               </Container>
        </main>
      <Footer />

   </Router>
  );
}

export default App;
