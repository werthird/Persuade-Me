import React, { useEffect } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route, useLocation  } from 'react-router-dom';
import Landing from './pages/Landing';
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

function HomeHeaderWrapper() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  if (isHomePage) {
    return null;
  } else {
    return <Header />;
  }
}

function HomeFooterWrapper() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  if (isHomePage) {
    return null;
  } else {
    return <Footer />;
  }
}


function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <HomeHeaderWrapper />
          <div className="flex flex-col justify-center">
            <Routes>
              <Route 
                path="/"
                element={<Landing />}
              />
              <Route 
                path="/home"
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
          <HomeFooterWrapper />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
