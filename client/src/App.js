import React, { useEffect } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import Socket
import io from 'socket.io-client';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Debate from './pages/Debate';
import Header from './components/Header';
import Footer from './components/Footer';
import Highscore from './pages/Highscore';
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const socket = io('http://localhost:3001'); // Replace with your server URL


function App() {

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ApolloProvider client={client} context={socket}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="flex flex-col justify-center">
            <Routes>
              <Route 
                path="/"
                element={<Home />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="/me"
                element={<Profile />}
              />
              <Route
                path="/profiles/:profileId"
                element={<Profile />}
              />
              <Route 
                path="/lobby/:lobbyId"
                element={<Debate />}
              />
              <Route 
                path="/highscore"
                element={<Highscore />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
