"use strict"  

require('./../../../bootstrap/app.js') 

const UDPClient  = use('@core/udp-client')

const client = new UDPClient({ host: 'localhost', port: 3000, timeout: 2000, retries: 2 });


// Helper function to log responses.
function logResponse(label, response) {
    console.log(`${label}:`, JSON.stringify(response, null, 2));
  }
  
  // 1. Create a new user.
  client.get('/api/users')
    .then(response => {
      //logResponse('get users', response);
      // Assume the new user gets id "1" (since our in-memory store starts at 1)
      console.log( JSON.stringify(response));
      return response;
    })
    .catch(err => {
      console.error('Error in CRUD operations:', err.message);
    })
    .finally(() => {
      // Optionally, close the client after a delay.
      setTimeout(() => {
        client.socket.close();
        console.log('UDP client closed.');
      }, 30000);
    });
  



