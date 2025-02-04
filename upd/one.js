// Import the required modules
const net = require('net');
const dgram = require('dgram');

// Create a TCP server using the net module
const tcpServer = net.createServer((socket) => {
  console.log('New TCP connection established');

  // Handle data received from the TCP client
  socket.on('data', (data) => {
    console.log('TCP server received:', data.toString());
    // Optionally, send data back to the client
    socket.write('TCP server response');
  });

  // Handle TCP client connection close
  socket.on('end', () => {
    console.log('TCP connection closed');
  });

  // Handle errors on the TCP connection
  socket.on('error', (err) => {
    console.error('TCP socket error:', err);
  });
});

// Start the TCP server on port 41234
tcpServer.listen(41234, () => {
  console.log('TCP Server listening on port 41234');
});

// Create a UDP server using the dgram module
const udpServer = dgram.createSocket('udp4');

// Handle incoming UDP messages
udpServer.on('message', (msg, rinfo) => {
  console.log(`UDP server received: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

// Handle UDP server errors
udpServer.on('error', (err) => {
  console.error('UDP server error:', err);
  udpServer.close();
});

// Start the UDP server on port 41234
udpServer.bind(41234, () => {
  console.log('UDP Server listening on port 41234');
});
