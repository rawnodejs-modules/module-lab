"use strict"  

require('./../../../bootstrap/app.js') 

const UDPClient  = use('@core/udp-client')

const client = new UDPClient({ host: 'localhost', port: 41234, timeout: 2000, retries: 2 });


// Helper function to log responses.
function logResponse(label, response) {
    console.log(`${label}:`, JSON.stringify(response, null, 2));
  }
  
  // 1. Create a new user.
  client.post('/api/user', { name: 'Alice', email: 'alice@example.com' })
    .then(response => {
      logResponse('Create User', response);
      // Assume the new user gets id "1" (since our in-memory store starts at 1)
      return response;
    })
    .then(response => {
      // 2. List all users.
      return client.get('/api/user');
    })
    .then(response => {
      logResponse('List Users', response);
      // 3. Retrieve the created user (assume id "1").
      return client.get('/api/user/1');
    })
    .then(response => {
      logResponse('Retrieve User', response);
      // 4. Update the user.
      return client.put('/api/user/1', { name: 'Alice Updated' });
    })
    .then(response => {
      logResponse('Update User', response);
      // 5. Delete the user.
      return client.delete('/api/user/1');
    })
    .then(response => {
      logResponse('Delete User', response);
    })
    .catch(err => {
      console.error('Error in CRUD operations:', err.message);
    })
    .finally(() => {
      // Optionally, close the client after a delay.
      setTimeout(() => {
        client.socket.close();
        console.log('UDP client closed.');
      }, 3000);
    });
  



