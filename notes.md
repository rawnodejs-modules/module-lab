What do you think:? So far rawnodemvc has 5 types of routings: http routing, websocket routing, tcp routing, udp routing, and event based routing. Here are a few examples on how they are implemented:

1. HTTP routing:
    ```javascript
    const {App}  = use('rawnodemvc');
    const app  = new App()
    app.get('/api/users', async(req, res, next) =>{})
    app.post('/api/users', async(req, res, next) =>{})
    app.get('/api/users/:id',async(req, res, next) =>{})
    app.put('/api/users/:id',async(req, res, next) =>{})
    app.delete('/api/users/:id',async(req, res, next) =>{})
    ``` 
2. TCP routing:
    ```javascript
    const {TCPRouter}  = use('rawnodemvc');
    const tcp  = new TCPRouter()
    tcp.get('/api/users', async(req, res, next) =>{})
    tcp.post('/api/users', async(req, res, next) =>{})
    tcp.get('/api/users/:id',async(req, res, next) =>{})
    tcp.put('/api/users/:id',async(req, res, next) =>{})
    tcp.delete('/api/users/:id',async(req, res, next) =>{})
    ``` 
3. WebSocket routing:
    ```javascript
    const {Socket}  = use('rawnodemvc');
    const io  = new Socket()
    io.get('/chat', (req, socket, head) => {});
    io.get('/users', (req, socket, head) => {});
    io.get('/blog', (req, socket, head) => {});
    io.get('/forum', (req, socket, head) => {});
    ``` 
4. UDP routing:

    ```javascript
    const {UDP}  = use('@core/rawnodemvc');
    const udp  = new UDP()
    udp.get('/api/users', async(req, res, next) =>{})
    udp.post('/api/users', async(req, res, next) =>{})
    udp.get('/api/users/:id',async(req, res, next) =>{})
    udp.put('/api/users/:id',async(req, res, next) =>{})
    udp.delete('/api/users/:id',async(req, res, next) =>{})
    ``` 

5. Event based routing:

    ```javascript
    const {App, TCPRouter, UDP, Socket}  = use('@core/rawnodemvc');
    const app  = new App()
    const tcp  = new TCPRouter()
    const udp  = new UDP()
    const io  = new Socket()
    app.on('/home', async(req, res, next) =>{})
    app.on('/users', async(req, res, next) =>{})
    tcp.on('/forum',async(req, res, next) =>{})
    udp.on('/video',async(req, res, next) =>{})
    io.on('/chat',async(req, res, next) =>{})
    ``` 


