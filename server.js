"use strict"  

require('./../../../bootstrap/app.js') 


const UDP = use('@core/udp-server')
const Axios = use('@core/axios')

const axios = new Axios()


const udp = new UDP();

udp.post('/api/user', async (req, res, next) => {

    console.log('Server on post')
    console.log(req)  // User data from client
    const {users} = await axios.get('users')
    res.send({ message: 'User created', user: users[4] });
  });


  udp.get('/api/users', async (req, res, next) => {
    const {users} = await axios.get('users')
    res.send({ message: 'Get all users', users: users[0] });
  });


// udp.get('/api/users', async (req, res, next) => {
//     const { users } = await axios.get('users');
//     // Let's assume req.data.page and req.data.limit exist, or set defaults:
//     const page = Number(req.data?.page) || 1;
//     const limit = Number(req.data?.limit) || 50;
//     const start = (page - 1) * limit;
//     const paginatedUsers = users.slice(start, start + limit);
    
//     res.send({ message: 'Get users', page, limit, users: paginatedUsers });
//   });


udp.server.on('error', (err) => {
  console.error(`UDP server error:\n${err.stack}`);
  upd.server.close();
});

udp.server.bind(3000, () => {
  console.log('UDP server listening on port 3000');
});
