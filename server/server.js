const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const cors = require('cors');


var allClients = [];
var allClientObj = {}
var openRooms = {

}

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
io.on('connection', async (socket) => {
  console.log(`User connected: ${socket.id}`);
  // JOIN LOBBY
  socket.on('join_lobby', async (data) => {
    const presentCheck = () => {
      const thisUser = allClients.filter(user => user.name === data.user.name)
      if (thisUser === []) {
        allClients.push(data)
        console.log(allClients)
      }
    }
    presentCheck()
    socket.join(data.lobby);
    await socket.to(data.lobby).emit('user_join', data.user)
    const lobbyViewers = allClients.filter(user => user.lobby === data.lobby)
    console.log(allClients)
    await socket.to(socket.id).emit('viewers', '')
    console.log(`${data.user.name} with socketID: ${socket.id} joined lobby: ${data.lobby}`);
  });

  // Listen to any client requests
  socket.on('client_message', (data) => {
    console.log(data)
    console.log('Received message:', data.contents);
    socket.to(data.lobby).emit('server_message', data);
    console.log('Sent message: ', data.contents, `to: ${data.lobby}`)
  });

  //Listen to timer events?
  socket.on('timer_event', (data) => {
    console.log(data)
    socket.in(data.lobby).emit('timer_event', data.event)
  })

  socket.on('staff_event', (data) => {
    socket.to(data.lobby).emit('staff_event', data)
    console.log(data)
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`)
  })
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







