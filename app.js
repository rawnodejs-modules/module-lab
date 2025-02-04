"use strict"  

require('./../../../bootstrap/app.js') 


const Axios = use('@core/axios')

const axios = new Axios()

axios.get('users')
.then(data => {
    console.log(data.users[0]['id'])  // Array of user objects
})
.catch(console.error)