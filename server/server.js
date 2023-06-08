const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const cors = require('cors');


const app = express();
const httpServer = createServer(app);
app.use(cors());
const io = new Server(httpServer, {
  cors: {
    // We are expecting calls to come from this port
    origin: 'http://localhost:3000',
    // These are the calls that we are allowing
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3001;




// ======================================================
// SOCKET.IO 

// Make connection to client
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // JOIN LOBBY
  socket.on('join_lobby', (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined lobby: ${data}`);
  });

  // Listen to any client requests
  socket.on('client_message', (data) => {
    console.log('Received message:', data);

    socket.emit('server_message', data);
  });
});

// ======================================================


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer();


// Handle server close event
httpServer.on('close', () => {
  // Close the Socket.IO instance
  io.close();
});







