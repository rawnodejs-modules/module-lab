"use strict"  

require('./../../../bootstrap/app.js') 

const Router = use('@core/http-router')

const http  = require('http')
const Axios = use('@core/axios')

const {Model} = use('@core/mongodb')

const Colors = use('@core/colors')

const colors = new Colors();


class Product extends Model {
    constructor(){
        super('products', {dbName: 'wonderfulpizza'})
    }
}

const axios = new Axios()

const app = new Router();

app.post('/api/user', async (req, res, next) => {})


app.get('/', (req, res, next) => {
    
    console.log('This is supper cool!')
    next();
}, (req, res, next) => {
    res.view('index')
})
app.get('/products',  async (req, res, next, product = new Product()) =>{
    
    const limit  =  async (quantity = 1, key = 'price',  op = '<=', qty = 5) => await product.where(key , op,qty).find({}, {limit:quantity});
    const products = await limit(50, 'rating', '>=', 3)
    res.view('products', {products, green: colors.Green, red: colors.Red, blue: colors.Blue});
})

app.get('/products/:slug',  async (req, res, next, product = new Product()) =>{
    const item = await product.finByKey('slug', req.params.slug);
    res.status(200).send(item)
})
app.on('/', (req, res, next, route) => {
    console.log(`app on / GET request for ${route.path}`)

    if(route.method === 'GET') next()
   else res.status(200).send({success: 'User Page'})
})
app.on('get', (req, res, next, route) => {
    console.log(`app on get GET request for ${route.path}`)
    res.status(200).send({success: 'GET request'})
})
app.get('/home', (req, res, next) => {
    res.view('index');
    // res.status(200).send({success: 'Home Page'})
})
const server = http.createServer((req, res) => {
    app.handleRequest(req, res)
})
server.listen(3000, () => {
    console.log('Server listening on port 3000')
})