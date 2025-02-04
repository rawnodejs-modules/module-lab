"use strict"  

require('./../../../bootstrap/app.js') 

const dgram = require('dgram');


const UDPRouter = use('@core/udp-router')

// const router = new UDPRouter();



/* ============================================
   CRUD for Users using UDPRouter
   ============================================ */

// In-memory store for users.
const users = {}; // keyed by user id (string)
let nextUserId = 1;

const router = new UDPRouter();

// Middleware to log incoming requests.
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.route}`);
  next();
});

// CRUD: Collection route for users.
// POST to create a new user; GET to list all users.
router.post('/api/user', (req, res, next) => {
  // Create a new user with a unique id.
  const id = String(nextUserId++);
  users[id] = { id, ...req.data };
  res.send({ message: 'User created', user: users[id] });
});
router.get('/api/user', (req, res, next) => {
  res.send({ message: 'User list', users: Object.values(users) });
});

// CRUD: Item route for a specific user by id.
// GET to retrieve, PUT to update, DELETE to delete.
router.get('/api/user/:id', (req, res, next) => {
  const id = req.params.id;
  if (!users[id]) return res.send({ error: 'User not found' });
  res.send({ message: 'User retrieved', user: users[id] });
});
router.put('/api/user/:id', (req, res, next) => {
  const id = req.params.id;
  if (!users[id]) return res.send({ error: 'User not found' });
  users[id] = { ...users[id], ...req.data };
  res.send({ message: 'User updated', user: users[id] });
});
router.delete('/api/user/:id', (req, res, next) => {
  const id = req.params.id;
  if (!users[id]) return res.send({ error: 'User not found' });
  delete users[id];
  res.send({ message: 'User deleted' });
});

/* ============================================
   UDP Server Setup
   ============================================ */

const udpServer = dgram.createSocket('udp4');

// When a UDP message arrives, pass it to our router.
udpServer.on('message', (msg, rinfo) => {
  const sendResponse = (data) => {
    const responseBuffer = Buffer.from(JSON.stringify(data));
    udpServer.send(responseBuffer, rinfo.port, rinfo.address, (err) => {
      if (err) console.error('Error sending response:', err);
    });
  };
  router.handleRequest(msg, rinfo, sendResponse);
});

udpServer.on('error', (err) => {
  console.error(`UDP server error:\n${err.stack}`);
  udpServer.close();
});

udpServer.bind(41234, () => {
  console.log('UDP server listening on port 41234');
});
